import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],

    cartLoading: false,
    cartLoadingError: false,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productId === productId);
      if (item && amount > 0) item.amount = amount;
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((el) => el.productId !== productId);
    },
    updateAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((p) => (
        {
          productId: p.product.id,
          amount: p.quantity,
        }
      ));
    },
  },
  actions: {
    loadCart({ commit, state }) {
      state.cartLoading = true;
      state.cartLoadingError = false;

      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: state.userAccessKey,
        },
      })
        .then((response) => {
          if (!state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            commit('updateAccessKey', response.data.user.accessKey);
          }
          commit('updateCartProductsData', response.data.items);
          commit('syncCartProducts');
        })
        .catch(() => { state.cartLoadingError = true; })
        .then(() => { state.cartLoading = false; });
    },
    addProductToCart({ commit, state }, { productId, amount }) {
      state.cartLoading = true;
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: state.userAccessKey,
        },
      })
        .then((response) => {
          commit('updateCartProductsData', response.data.items);
          commit('syncCartProducts');
        })
        .then(() => { state.cartLoading = false; });
    },
    updateCartProductAmount({ commit, state }, { productId, amount }) {
      commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        return undefined;
      }
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: state.userAccessKey,
        },
      })
        .then((response) => {
          commit('updateCartProductsData', response.data.items);
        })
        .catch(() => { commit('syncCartProducts'); });
    },
    deleteCartProduct({ commit, state }, { productId }) {
      if (!productId) {
        return undefined;
      }
      state.cartLoading = true;
      commit('deleteCartProduct', productId);
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        params: {
          userAccessKey: state.userAccessKey,
        },
        data: {
          productId,
        },
      })
        .then((response) => {
          commit('updateCartProductsData', response.data.items);
        })
        .catch(() => { commit('syncCartProducts'); })
        .then(() => { state.cartLoading = false; });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((el) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === el.productId);
        return {
          ...el,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
});

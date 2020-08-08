<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title" />
    </div>
    <h3 class="product__title">{{item.product.title}}</h3>
    <span class="product__code">Артикул: {{item.product.id}}</span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click.prevent="amount > 1 ? amount -= 1 : null"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus" />
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" />

      <button type="button" aria-label="Добавить один товар" @click.prevent="amount += 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus" />
        </svg>
      </button>
    </div>

    <b class="product__price">{{(item.product.price * item.amount) | numberFormat}} ₽</b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close" />
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';

export default {
  props: ['item'],
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>

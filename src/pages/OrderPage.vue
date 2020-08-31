<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'cart'}" class="breadcrumbs__link">Корзина</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{products.length | declOfNum}}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя"/>
            <BaseFormText v-model="formData.address" title="Адрес доставки" :error="formError.address"  placeholder="Введите ваш адрес"/>
            <BaseFormText v-model="formData.phone" title="Телефон" :error="formError.phone" type="tel" placeholder="Введите ваш телефон"/>
            <BaseFormText v-model="formData.email" title="Email" :error="formError.email" type="email" placeholder="Введите ваш Email"/>
            <BaseFormTextarea v-model="formData.comment" :error="formError.comment" title="Комментарии" placeholder="Ваши пожелания" />
          </div>
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked
                  />
                  <span class="options__value">
                    Самовывоз
                    <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value">
                    Курьером
                    <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value">Картой при получении</span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value">Наличными при получении</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="p in products" :key="p.productId">
              <h3>{{ p.product.title }}</h3>
              <b>{{ p.product.price | numberFormat}} ₽</b>
              <span>Артикул: {{ p.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка:
              <b>500 ₽</b>
            </p>
            <p>
              Итого:
              <b>{{products.length | declOfNum}}</b> на сумму
              <b>{{ totalPrice | numberFormat}} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
          <p v-show="orderSent">Заказ оформлен</p>
          <p v-show="orderSending">Заказ оформляется</p>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>{{ formErrorMessage }}</h4>
          <p>Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from "@/components/BaseFormText";
import BaseFormTextarea from "@/components/BaseFormTextarea";
import numberFormat from '@/helpers/numberFormat';
import declOfNum from "@/helpers/declOfNum";
import {mapGetters} from 'vuex';
import axios from  'axios';
import API_BASE_URL from '@/config';

export default {
  components: {BaseFormTextarea, BaseFormText},
  filters: { numberFormat, declOfNum},
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderSent: false,
      orderSending: false
    }
  },
  computed:{
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' })
  },
  methods: {
    order(){
      this.orderSent = false
      this.orderSending = true
      this.formError = {}
      axios.post(`${API_BASE_URL}/api/orders`,{...this.formData}, {params: {
        userAccessKey: this.$store.state.userAccessKey
        }})
        .then( response => {
          this.$store.commit('resetCart')
          this.$store.commit('updateOrderInfo', response.data)
          this.orderSent = true
          this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
        })
      .catch( error => {
        this.formError = error.response.data.error.request || {}
        this.formErrorMessage = error.response.data.error.message
      })
      .finally( () => {this.orderSending = false})
    }
  }
}
</script>

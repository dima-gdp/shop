<template>
  <div>
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id}) ">
      <img :src="product.image" :alt="product.item" />
    </a>

    <h3 class="catalog__title">
      <a href="#" @click.prevent="gotoPage('product', {id: product.id})">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ product.price | numberFormat}} ₽</span>
  </div>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  methods: {
    gotoPage,
  },
  filters: {
    numberFormat,
  },
};
</script>

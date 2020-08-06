<template>
  <div>
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id} }">
      <img :src="product.image" :alt="product.item" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id} }">{{ product.title }}</router-link>
    </h3>

    <span class="catalog__price">{{ product.price | numberFormat}} ₽</span>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
};
</script>

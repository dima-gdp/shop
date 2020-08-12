<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="product in products" :key="product.id">
      <ProductItem :product="product" />
      <ProductColors :colors="product.colors" />
    </li>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';
import ProductColors from './ProductColors.vue';

export default {
  components: { ProductItem, ProductColors },
  props: ['products', 'product'],
};
</script>

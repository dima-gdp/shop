<template>
  <div>
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.item" />
    </a>

    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ product.price }} ₽</span>
  </div>
</template>

<script>
export default {
  props: ['product'],
};
</script>

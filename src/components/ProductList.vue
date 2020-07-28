<template>
  <ul class="catalog__list">
    <li
      class="catalog__item"
      v-for="(product, index) in products"
      :key="index"
    >
      <ProductItem :product="product" />

      <ul class="colors colors--black">
        <li class="colors__item">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              name="color-1"
              value="#73B6EA"
              checked
            />
            <span
              class="colors__value"
              style="background-color: #73B6EA;"
            ></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              name="color-1"
              value="#8BE000"
            />
            <span
              class="colors__value"
              style="background-color: #8BE000;"
            ></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              name="color-1"
              value="#222"
            />
            <span
              class="colors__value"
              style="background-color: #222;"
            ></span>
          </label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products', 'product'],
};
</script>

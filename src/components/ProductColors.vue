<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :name="groupColor" :value="color" />
        <span class="colors__value" :style="{backgroundColor: color}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'groupColor'],
};
</script>

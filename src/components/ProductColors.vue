<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="(color, idx) in colors" :key="color.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :name="color.title"
          :value="color.code"
          :checked="idx === 0"
        />
        <span class="colors__value" :style="{backgroundColor: color.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors'],
};
</script>

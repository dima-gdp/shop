<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus" />
      </svg>
    </button>

    <input type="text" v-model.number="currentProductAmount" name="count" />

    <button type="button" aria-label="Добавить один товар" @click="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['productAmount'],
  data() {
    return {
      currentProductAmount: 1,
    };
  },
  methods: {
    increment() {
      this.currentProductAmount += 1;
    },
    decrement() {
      if (this.currentProductAmount > 1) {
        this.currentProductAmount -= 1;
      }
    },
  },
  watch: {
    currentProductAmount(value) {
      this.$emit('update:productAmount', value);
    },
  },
};
</script>

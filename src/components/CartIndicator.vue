<template>
  <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
    <div class="load-wrapp" v-if="$store.state.cartLoading">
      <div class="load-5">
        <div class="ring-2">
          <div class="ball-holder">
            <div class="ball"></div>
          </div>
        </div>
      </div>
    </div>
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart" />
    </svg>
    <span
      class="header__count"
      aria-label="Количество товаров"
    >{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
export default {

};
</script>

<style>
.load-wrapp {
  position: absolute;
  top: 0;
  left: 0;
  float: left;
  width: 100%;
  height: 100%;
  text-align: center;
}

.ring-2 {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border: 2px solid rgb(139, 224, 0);
  border-radius: 100%;
  z-index: 5;
}

.ball-holder {
  position: absolute;
  width: 12px;
  height: 15px;
  left: 0px;
  top: 0px;
}

.ball {
  position: absolute;
  top: -7px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: rgb(139, 224, 0);
}

.load-5 .ball-holder {
  animation: loadingE 1.3s linear infinite;
}

@keyframes loadingE {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

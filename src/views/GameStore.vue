<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <div
      v-if="
        this.$route.path === '/' ||
          this.$route.name === 'ProductDetail' ||
          this.$route.name === 'Coupon'
      "
      class="w-100 fixed-bottom"
    >
      <ShoppingCart></ShoppingCart>
    </div>
    <footer class="bg-light text-muted py-5 sticky-bottom">
      <div>
        <ul class="list-inline text-center">
          <li class="list-inline-item text-danger">
            <router-link class="text-danger" to="/"
              ><i class="fab fa-nintendo-switch"></i> NS GameStore</router-link
            >
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="https://www.instagram.com/nintendo/">
              <i class="fab fa-instagram"></i> Instagram
            </a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="https://zh-tw.facebook.com/NintendoSwitch/">
              <i class="fab fa-facebook"></i> Facebook
            </a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="https://en.wikipedia.org/wiki/Nintendo_Switch">About</a>
          </li>
        </ul>
        <p class="text-center">© Copright 2018</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
// import Carousel from '@/components/Carousel.vue';
// import Checkout from '@/components/Checkout.vue';
// import Products from '@/components/Products.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';

export default {
  components: {
    Navbar,
    // Carousel,
    // Checkout,
    // Products,
    ShoppingCart,
  },
};
</script>

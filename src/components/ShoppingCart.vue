<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-sm btn-cart float-right mr-5 mb-5 bg-dark"
      @click.prevent="openCartModal"
    >
      <i class="fa fa-shopping-cart text-danger fa-2x " aria-hidden="true"></i>
      <span class="badge badge-pill badge-danger">{{ shoppingCartCount }}</span>
      <span class="sr-only">unread messages</span>
    </button>
    <ShoppingCartModal :parent-carts="carts" :parent-price="price"></ShoppingCartModal>
  </div>
</template>

<script>
import $ from 'jquery';
import ShoppingCartModal from './ShoppingCartModal.vue';

export default {
  components: {
    ShoppingCartModal,
  },
  data() {
    return {
      shoppingCartCount: 0,
      carts: [],
      price: {},
    };
  },
  methods: {
    getShoppingCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;

      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$set(vm, 'carts', response.data.data.carts);
          vm.$set(vm.price, 'total', response.data.data.total);
          vm.$set(vm.price, 'final_total', response.data.data.total);
          vm.shoppingCartCount = vm.carts.length;
        }
      });
    },
    openCartModal() {
      $('#cartModal')
        .appendTo('body')
        .modal('show');
    },
  },
  created() {
    const vm = this;

    vm.getShoppingCart();

    vm.$bus.$on('get-cart-count', () => {
      vm.getShoppingCart();
    });
  },
};
</script>

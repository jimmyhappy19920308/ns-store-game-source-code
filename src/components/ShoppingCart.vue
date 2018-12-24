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
    <ShoppingCartModal></ShoppingCartModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import $ from 'jquery';
import ShoppingCartModal from './ShoppingCartModal.vue';

export default {
  components: {
    ShoppingCartModal,
  },
  computed: {
    ...mapGetters('cartsModules', ['shoppingCartCount']),
  },
  methods: {
    openCartModal() {
      $('#cartModal')
        .appendTo('body')
        .modal('show');
    },
  },
};
</script>

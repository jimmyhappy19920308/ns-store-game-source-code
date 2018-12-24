import axios from 'axios';

export default {
  namespaced: true,
  state: {
    shoppingCartCount: 0,
    carts: [],
    price: {},
  },
  actions: {
    addToCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;

      if (qty === 0) {
        context.dispatch('productsModules/setProductNum', 1, { root: true });
        qty = 1;
      }

      const cart = {
        product_id: id,
        qty,
      };

      context.dispatch('updateLoading', true, { root: true });

      axios.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          // this.$bus.$emit('get-cart-count');
          context.dispatch('getCart');

          context.dispatch('updateLoading', false, { root: true });

          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      });
    },
    getCart(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;

      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('CARTS', response.data.data.carts);
          context.commit('PRICE_TOTAL', response.data.data.total);
          context.commit('PRICE_FINAL_TOTAL', response.data.data.final_total);
          context.commit('CART_COUNT');
        }
      });
    },
  },
  mutations: {
    CARTS(state, payload) {
      state.carts = payload;
    },
    PRICE_TOTAL(state, payload) {
      state.price.total = payload;
    },
    PRICE_FINAL_TOTAL(state, payload) {
      state.price.final_total = payload;
    },
    CART_COUNT(state) {
      state.shoppingCartCount = state.carts.length;
    },
  },
  getters: {
    shoppingCartCount(state) {
      return state.shoppingCartCount;
    },
    carts(state) {
      return state.carts;
    },
    price(state) {
      return state.price;
    },
  },
};

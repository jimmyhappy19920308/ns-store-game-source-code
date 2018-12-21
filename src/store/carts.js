import axios from 'axios';

export default {
  namespaced: true,
  state: {
    shoppingCartCount: 0,
    carts: [],
    price: {},
  },
  actions: {
    addCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };

      context.dispatch('updateLoading', true);

      axios.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          this.$bus.$emit('get-cart-count');

          context.dispatch('updateLoading', false);

          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      });
    },
  },
};

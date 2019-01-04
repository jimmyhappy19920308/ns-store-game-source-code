import axios from 'axios';

export default {
  namespaced: true,
  state: {
    shoppingCartCount: 0,
    carts: [
      {
        coupon: {
          code: 'testCode',
          due_date: 6547658,
          id: '-L9uIs5EfPibJpwwTMhN',
          is_enabled: 1,
          percent: 60,
          title: '超級特惠價格',
        },
        final_total: 2160,
        id: '-LATwxc_bIJu-AR4AlNj',
        product: {
          category: '衣服3',
          content: '這是內容',
          description: 'Sit down please 名設計師設計',
          id: '-L9tH8jxVb2Ka_DYPwng',
          image: 'test.testtest',
          is_enabled: 1,
          num: 1,
          origin_price: 500,
          price: 600,
          title: '[賣]動物園造型衣服3',
          unit: '個',
        },
        product_id: '-L9tH8jxVb2Ka_DYPwng',
        qty: 6,
        total: 3600,
      },
    ],
    price: {
      total: 3600,
      final_total: 2160,
    },
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
          const { message } = response.data;
          const status = 'success';

          context.dispatch('messageModule/updateMessage', { message, status }, { root: true });
          // this.$bus.$emit('get-cart-count');
          context.dispatch('getCart');

          context.dispatch('updateLoading', false, { root: true });
        } else {
          const { message } = response.data;
          const status = 'danger';

          context.dispatch('messageModule/updateMessage', { message, status }, { root: true });
          context.dispatch('updateLoading', false, { root: true });
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
    removeCartProduct(context, id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${
        process.env.VUE_APP_CUSTOM_PATH
      }/cart/${id}`;

      context.dispatch('updateLoading', true, { root: true });

      axios.delete(api).then(response => {
        if (response.data.success) {
          context.dispatch('getCart');

          context.dispatch('updateLoading', false, { root: true });
        } else {
          context.dispatch('updateLoading', false, { root: true });
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

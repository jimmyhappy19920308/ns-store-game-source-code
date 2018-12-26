import axios from 'axios';

export default {
  namespaced: true,
  state: {
    order: {
      create_at: 1523539834,
      id: '-L9u2EUkQSoEmW7QzGLF',
      is_paid: false,
      message: '這是留言',
      payment_method: 'credit_card',
      products: {
        LTWKjbtQsZSjerdwpBU: {
          final_total: 999,
          id: 'LTWKjbtQsZSjerdwpBA',
          product: {
            category: '',
            content: '',
            description: '',
            id: '',
            imageUrl: '',
            price: 990,
            title: '',
            unit: '個',
          },
          product_id: 'LTWKjbtQsZSjerdwpBC',
          qty: 1,
          total: 999,
        },
      },
      total: 100,
      user: {
        address: 'kaohsiung',
        email: 'test@gmail.com',
        name: 'test',
        tel: '0912346768',
      },
    },
  },
  actions: {
    getOrder(context, orderId) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${
        process.env.VUE_APP_CUSTOM_PATH
      }/order/${orderId}`;

      context.dispatch('updateLoading', true, { root: true });

      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('ORDER', response.data.order);

          context.dispatch('updateLoading', false, { root: true });
        } else {
          context.dispatch('updateLoading', false, { root: true });
        }
      });
    },
    payOrder(context, orderId) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${
        process.env.VUE_APP_CUSTOM_PATH
      }/pay/${orderId}`;

      context.dispatch('updateLoading', true, { root: true });

      axios.post(api).then(response => {
        if (response.data.success) {
          context.dispatch('getOrder', orderId);

          context.dispatch('updateLoading', false, { root: true });
        } else {
          context.dispatch('updateLoading', false, { root: true });
        }
      });
    },
  },
  mutations: {
    ORDER(state, order) {
      state.order = order;
    },
  },
};

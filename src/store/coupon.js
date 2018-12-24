import axios from 'axios';

export default {
  namespaced: true,
  state: {
    coupon: '',
    couponErrorMessage: '',
  },
  actions: {
    applyCoupon(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: context.state.coupon,
      };

      context.commit('updateLoading', true, { root: true });

      axios.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          context.dispatch('cartsModules/getCart', { root: true }); // 重新取得右下購物車的商品名稱、價格與數量

          context.commit('updateLoading', true, { root: false });

          context.commit('ERROR_MESSAGE', '');

          console.log(response.data.message);
        } else {
          context.commit('updateLoading', true, { root: false });

          context.commit('ERROR_MESSAGE', response.data.message);

          console.log(response.data.message);
        }
      });
    },
  },
  mutations: {
    ERROR_MESSAGE(state, payload) {
      state.couponErrorMessage = payload;
    },
  },
  getters: {
    coupon(state) {
      return state.coupon;
    },
  },
};

import axios from 'axios';

export default {
  namespaced: true,
  state: {
    coupon: '',
    cartsAlert: '購物車尚未有任何商品',
    couponErrorMessage: '',
  },
  actions: {
    applyCoupon(context, couponCode) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: couponCode,
      };

      context.dispatch('updateLoading', true, { root: true });

      axios.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          context.dispatch('cartsModules/getCart', null, { root: true }); // 重新取得右下購物車的商品名稱、價格與數量

          context.dispatch('updateLoading', false, { root: true });

          context.commit('ERROR_MESSAGE', '');

          console.log(response.data.message);
        } else {
          context.dispatch('updateLoading', false, { root: true });

          context.commit('ERROR_MESSAGE', response.data.message);

          console.log(response.data.message);
        }
      });
    },
    updateCoupon(context, coupon) {
      context.commit('UPDATE_COUPON', coupon);
    },
  },
  mutations: {
    ERROR_MESSAGE(state, payload) {
      state.couponErrorMessage = payload;
    },
    UPDATE_COUPON(state, coupon) {
      state.coupon = coupon.trim();
    },
  },
  getters: {
    coupon(state) {
      return state.coupon;
    },
    couponErrorMessage(state) {
      return state.couponErrorMessage;
    },
    cartsAlert(state) {
      return state.cartsAlert;
    },
  },
};

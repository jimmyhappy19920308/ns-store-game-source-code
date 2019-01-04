import axios from 'axios';

import router from '../router';

export default {
  namespaced: true,
  state: {
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  },
  actions: {
    updateName(context, name) {
      context.commit('NAME', name);
    },
    updateEmail(context, email) {
      context.commit('EMAIL', email);
    },
    updatePhone(context, phone) {
      context.commit('PHONE', phone);
    },
    updateAddress(context, address) {
      context.commit('ADDRESS', address);
    },
    updateMessage(context, message) {
      context.commit('MESSAGE', message);
    },
    sendOrder(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const order = {
        user: {
          name: context.state.name,
          email: context.state.email,
          tel: context.state.phone,
          address: context.state.address,
        },
        message: context.state.message,
      };

      context.dispatch('updateLoading', true, { root: true });

      axios.post(api, { data: order }).then(response => {
        if (response.data.success) {
          const { message } = response.data;
          const status = 'success';

          context.dispatch('messageModule/updateMessage', { message, status }, { root: true });
          context.dispatch('cartsModules/getCart', null, { root: true });

          context.dispatch('updateLoading', false, { root: true });
          router.push({
            name: 'CheckoutConfirmToPay',
            params: {
              orderId: response.data.orderId,
            },
          });
        } else {
          const { message } = response.data;
          const status = 'danger';

          context.dispatch('messageModule/updateMessage', { message, status }, { root: true });
          context.dispatch('updateLoading', false, { root: true });
        }
      });
    },
  },
  mutations: {
    NAME(state, name) {
      state.name = name;
    },
    EMAIL(state, email) {
      state.email = email;
    },
    PHONE(state, phone) {
      state.phone = phone;
    },
    ADDRESS(state, address) {
      state.address = address;
    },
    MESSAGE(state, message) {
      state.message = message;
    },
  },
  getters: {
    name(state) {
      return state.name;
    },
    email(state) {
      return state.email;
    },
    phone(state) {
      return state.phone;
    },
    address(state) {
      return state.address;
    },
    message(state) {
      return state.message;
    },
  },
};

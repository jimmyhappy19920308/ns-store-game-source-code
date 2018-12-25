export default {
  namespaced: true,
  state: {
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
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

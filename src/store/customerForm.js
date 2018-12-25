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

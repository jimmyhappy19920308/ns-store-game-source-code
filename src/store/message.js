export default {
  namespaced: true,
  state: {
    messages: [],
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
};

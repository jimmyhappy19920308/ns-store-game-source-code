export default {
  namespaced: true,
  state: {
    messages: [],
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);

      context.commit('MESSAGE', {
        message,
        status,
        timestamp,
      });
    },
  },
  mutations: {
    MESSAGE(state, payload) {
      state.messages.push(payload);
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
};

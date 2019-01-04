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

      context.dispatch('REMOVE_MESSAGE_TIMING', timestamp);
    },
    removeMessageWithTiming(context, timestamp) {
      setInterval(() => {
        context.state.messages.forEach((item, index) => {
          if (timestamp === item[index].timestamp) {
            context.commit('REMOVE_MESSAGE_TIMING', index);
          }
        });
      }, 3000);
    },
  },
  mutations: {
    MESSAGE(state, payload) {
      state.messages.push(payload);
    },
    REMOVE_MESSAGE_TIMING(state, index) {
      state.messages.splice(index, 1);
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
};

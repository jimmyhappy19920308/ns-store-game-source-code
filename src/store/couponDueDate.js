export default {
  namespaced: true,
  state: {
    nowDate: Math.floor(Date.now() / 1000),
    dueDate: Math.round(new Date('2018-12-31T23:59:59Z').getTime() / 1000),
    dueDateTimer: '6 Day 6 Hours 6 Minutes 6 Second',
    remainTime: 0,
  },
  actions: {
    countDueDate(context) {
      const remainTime = context.state.dueDate - context.state.nowDate - 28800;

      const day = Math.floor(remainTime / (24 * 3600));
      const hour = Math.floor((remainTime % (24 * 3600)) / 3600);
      const minute = Math.floor((remainTime % 3600) / 60);
      const second = Math.floor(remainTime % 60);

      setInterval(() => {
        context.commit('TIME', remainTime);
        context.commit(
          'DUE_DATE_TIMER',
          `${day} Day ${hour} Hours ${minute} Minutes ${second} Seconds`,
        );
      }, 1000);
    },
  },
};

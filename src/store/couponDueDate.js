export default {
  namespaced: true,
  state: {
    nowDate: Math.floor(Date.now() / 1000),
    dueDate: Math.round(new Date('2018-12-31T23:59:59Z').getTime() / 1000),
    dueDateTimer: '6 Day 6 Hours 6 Minutes 6 Second',
    time: 0,
  },
};

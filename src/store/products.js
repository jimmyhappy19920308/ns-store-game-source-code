import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    product: {},
    filterCategory: 'All',
    pagination: {},
  },
  actions: {
    getProducts(context, page) {
      let api = `${process.env.VUE_APP_API_PATH}/api/${
        process.env.VUE_APP_CUSTOM_PATH
      }/products?page=${page}`;

      if (this.state.filterCategory !== 'All') {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      }

      context.dispatch('updateLoading', true, { root: true });

      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products);
          context.commit('PAGINATION', response.data.pagination);
          context.dispatch('updateLoading', false, { root: true });
        } else {
          console.log(response.data.message);
        }
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
  },
  getters: {
    filterProducts(state) {
      if (state.filterCategory !== 'All') {
        return state.products.filter(item => item.category === state.filterCategory);
      }

      return state.products;
    },
  },
};

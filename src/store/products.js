import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    product: {},
    category: 'All',
    pagination: {},
  },
  actions: {
    getProducts(context, page) {
      let api = `${process.env.VUE_APP_API_PATH}/api/${
        process.env.VUE_APP_CUSTOM_PATH
      }/products?page=${page}`;

      if (context.state.category !== 'All') {
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
    filterCategory(context, category) {
      context.commit('CATEGORY', category);
      if (category !== 'All') {
        context.dispatch('getProducts');
      }
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    CATEGORY(state, payload) {
      state.category = payload;
    },
  },
  getters: {
    filterProducts(state, category) {
      if (state.category !== 'All') {
        return state.products.filter(item => item.category === category);
      }

      return state.products;
    },
  },
};

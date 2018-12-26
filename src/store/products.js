import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [
      {
        category: '衣服3',
        content: '這是內容',
        description: 'Sit down please 名設計師設計',
        id: '-L9tH8jxVb2Ka_DYPwng',
        image: 'test.testtest',
        is_enabled: 1,
        num: 1,
        origin_price: 100,
        price: 600,
        title: '[賣]動物園造型衣服3',
        unit: '個',
      },
    ],
    product: {
      category: '衣服3',
      content: '這是內容',
      description: 'Sit down please 名設計師設計',
      id: '-L9tH8jxVb2Ka_DYPwng',
      image: 'test.testtest',
      is_enabled: 1,
      num: 0,
      origin_price: 100,
      price: 600,
      title: '[賣]動物園造型衣服3',
      unit: '個',
    },
    category: 'All',
    pagination: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false,
      category: null,
    },
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
          context.dispatch('updateLoading', false, { root: true });
        }
      });
    },
    setProductNum(context, payload) {
      context.commit('PRODUCT_NUM', payload);
    },
    filterCategory(context, category) {
      context.commit('CATEGORY', category);

      context.dispatch('getProducts');
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
    PRODUCT_NUM(state, payload) {
      state.product.num = payload;
    },
  },
  getters: {
    filterProducts(state) {
      if (state.category !== 'All') {
        return state.products.filter(item => item.category === state.category);
      }

      return state.products;
    },
    initProductNum(state) {
      return state.product.num;
    },
  },
};

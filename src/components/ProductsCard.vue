<template>
  <div>
    <div class="tab-content">
      <div class="tab-pane active" id="list-gold">
        <div class="row">
          <div class="col-md-4 mb-4" v-for="item in filterProducts" :key="item.id">
            <div class="card border-0 box-shadow text-center h-100">
              <div class="card-head">
                <img class="card-img-top image" :src="item.imageUrl" alt="Card image cap" />
                <div class="middle">
                  <router-link
                    class="text text-primary border border-primary py-2 px-2 h5"
                    :to="{ name: 'ProductDetail', params: { product: item } }"
                    >Show More</router-link
                  >
                </div>
              </div>
              <div class="card-body">
                <router-link
                  class="text"
                  :to="{ name: 'ProductDetail', params: { product: item } }"
                >
                  <span class="card-title text-secondary h5">{{ item.title }}</span>
                </router-link>
                <p class="card-text mt-3">{{ item.description }}</p>
              </div>
              <div class="card-footer border-top-0 bg-white">
                <router-link
                  class="btn btn-outline-primary btn-sm mb-3 btn-block"
                  :to="{ name: 'ProductDetail', params: { product: item } }"
                >
                  <i class="fas fa-ellipsis-h"></i> 更多詳情
                </router-link>

                <a
                  href="#"
                  class="btn btn-outline-danger btn-sm btn-block"
                  @click.prevent="addCart(item.id)"
                >
                  <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- tab-content end -->

    <!-- pagination -->
    <ProductsPagination
      v-if="this.$store.state.category === 'All'"
      :parent-pagination="this.$store.state.pagination"
      @get-current-page="getProducts"
    ></ProductsPagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductsPagination from './ProductsPagination.vue';

export default {
  components: {
    ProductsPagination,
  },
  data() {
    return {
      pagination: {},
    };
  },
  computed: {
    ...mapGetters('productsModules', ['filterProducts']),
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('productsModules/getProducts', page);
    },
    addCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };

      this.$store.dispatch('updateLoading', true);

      vm.$http.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('get-cart-count');

          this.$store.dispatch('updateLoading', false);

          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getProducts();

    vm.$bus.$on('filter-category', category => {
      vm.$set(vm, 'filterCategory', category);
      if (vm.filterCategory !== 'All') {
        vm.getProducts();
      }
    });
  },
};
</script>

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
      v-if="$store.state['productsModules']['category'] === 'All'"
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
  computed: {
    ...mapGetters('productsModules', ['filterProducts']),
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('productsModules/getProducts', page);
    },
    addCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addToCart', { id, qty });
    },
  },
  created() {
    this.$store.dispatch('cartsModules/getCart');
  }
};
</script>

<template>
  <div class="h-100">
    <div class="container h-100">
      <div class="row">
        <div class="col">
          <section class="row justify-content-center mt-5" v-if="carts.length > 0">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h6 class="mb-0 d-flex align-items-center">
                    <a data-toggle="collapse" href="#collapseOne">
                      顯示購物車細節 <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </a>
                    <span class="h3 ml-auto mb-0">{{ price.final_total | currency }}</span>
                  </h6>
                </div>
              </div>
              <div id="collapseOne" class="collapse mt-3">
                <table class="table">
                  <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in carts" :key="item.id">
                      <td class="align-middle">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click.prevent="removeCartProduct(item.id)"
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td class="align-middle">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                      </td>
                      <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
                      <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">總計</td>
                      <td class="text-right">{{ price.total | currency }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right text-success h4">折扣價</td>
                      <td class="text-right text-success h4">{{ price.final_total | currency }}</td>
                    </tr>
                  </tfoot>
                </table>
                <div class="input-group mb-3 input-group-md">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    v-model.trim="coupon"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-danger"
                      type="button"
                      @click.prevent="applyCoupon"
                    >
                      套用優惠碼
                    </button>
                  </div>
                </div>
                <div v-if="couponErrorMessage" class="text-danger d-flex justify-content-center h3">
                  {{ couponErrorMessage }}
                </div>
              </div>
            </div>
          </section>
          <div class="alert alert-secondary mt-4" role="alert" v-else>
            <p class="text-center h3 text-danger mb-0">{{ cartsAlert }}</p>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <router-link class="btn btn-primary" to="/" v-if="carts.length <= 0"
              >返回選購</router-link
            >
            <router-link class="btn btn-danger" to="" @click.native="confirmOrder" v-else
              >確認訂購</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      coupon: '',
      cartsAlert: '購物車尚未有任何商品',
      couponErrorMessage: '',
    };
  },
  created() {
    const vm = this;

    vm.getCart();
  },
  computed: {
    ...mapGetters('cartsModules', ['carts', 'price']),
  },
  methods: {
    getCart() {
      this.$store.dispatch('cartsModules/getCart');
    },
    removeCartProduct(id) {

      this.$store.dispatch('cartsModules/removeCartProduct', id);

    },
    applyCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: vm.coupon,
      };

      vm.isLoading = true;

      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.getCarts();

          vm.$bus.$emit('get-cart-count'); // 重新取得右下購物車的商品名稱、價格與數量

          vm.isLoading = false;

          vm.couponErrorMessage = '';

          console.log(response.data.message);
        } else {
          vm.isLoading = false;

          vm.couponErrorMessage = response.data.message;

          console.log(response.data.message);
        }
      });
    },
    confirmOrder() {
      const vm = this;

      vm.isLoading = true;

      setTimeout(() => {
        vm.$router.push({
          name: 'CheckoutCustomerForm',
        });

        vm.isLoading = false;
      }, 200);
    },
  },
};
</script>

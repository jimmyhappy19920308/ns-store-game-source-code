<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartModalLabel">購物車內容</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table" v-if="carts.length > 0">
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
                      @click.prevent="removeProduct(item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right text-danger">總計</td>
                  <td class="text-right text-danger h4">{{ price.final_total | currency }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="alert alert-secondary mt-4" role="alert" v-else>
              <p class="text-center h3 text-danger mb-0">{{ cartsAlert }}</p>
            </div>
          </div>
          <div class="modal-footer" v-if="price.final_total">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <a class="btn btn-danger" href="#" @click.prevent="goToCheckoutComponent"> 結帳 </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import $ from 'jquery';

export default {
  data() {
    return {
      cartsAlert: '購物車尚未有任何商品',
    };
  },
  computed: {
    ...mapGetters('cartsModules', ['carts', 'price']),
  },
  methods: {
    removeProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${
        process.env.VUE_APP_CUSTOM_PATH
      }/cart/${id}`;

      vm.isLoading = true;

      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('get-cart-count');

          vm.isLoading = false;

          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      });
    },
    goToCheckoutComponent() {
      const vm = this;

      $('#cartModal').modal('hide');
      $('.modal-backdrop').remove();
      $('#cartModal').remove();
      $('body').removeClass('modal-open');

      vm.$router.push('/checkout');
    },
  },
  created() {
    this.$store.dispatch('cartsModules/getCart');
  },
};
</script>

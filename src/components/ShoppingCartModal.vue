<template>
  <div>
    <loading :active.sync="isLoading"></loading>
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
            <table class="table" v-if="newPrice.final_total">
              <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in computeCarts" :key="item.id">
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
                  <td class="text-right text-danger h4">{{ newPrice.final_total | currency }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="alert alert-secondary mt-4" role="alert" v-else>
              <p class="text-center h3 text-danger mb-0">{{ cartsAlert }}</p>
            </div>
          </div>
          <div class="modal-footer" v-if="newPrice.final_total">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <a class="btn btn-danger" href="#" @click.prevent="goToCheckoutComponent"> 結帳 </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    parentCarts: {
      type: Array,
    },
    parentPrice: {
      type: Object,
    },
  },
  data() {
    return {
      newCarts: [
        {
          coupon: {
            code: 'testCode',
            due_date: 6547658,
            id: '-L9uIs5EfPibJpwwTMhN',
            is_enabled: 1,
            percent: 60,
            title: '超級特惠價格',
          },
          final_total: 2160,
          id: '-LATwxc_bIJu-AR4AlNj',
          product: {
            category: '衣服3',
            content: '這是內容',
            description: 'Sit down please 名設計師設計',
            id: '-L9tH8jxVb2Ka_DYPwng',
            image: 'test.testtest',
            is_enabled: 1,
            num: 1,
            origin_price: 500,
            price: 600,
            title: '[賣]動物園造型衣服3',
            unit: '個',
          },
          product_id: '-L9tH8jxVb2Ka_DYPwng',
          qty: 6,
          total: 3600,
        },
      ],
      newPrice: this.parentPrice,
      cartsAlert: '購物車尚未有任何商品',
      isLoading: false,
    };
  },
  computed: {
    computeCarts() {
      const vm = this;

      vm.newCarts = vm.parentCarts;

      return vm.newCarts;
    },
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
};
</script>

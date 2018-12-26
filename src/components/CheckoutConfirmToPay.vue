<template>
  <div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right text-danger h3">{{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th width="120">收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th width="120">收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span
                ><span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="!order.is_paid">
          <button class="btn btn-secondary" @click.prevent="goHome">繼續逛逛</button>
          <button class="btn btn-danger" @click.prevent="payOrder">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    orderId: {
      type: String,
    },
  },
  computed: {
    ...mapState('orderModules', ['order']),
  },
  methods: {
    getOrder() {
      this.$store.dispatch('orderModules/getOrder');
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${
        vm.orderId
      }`;

      vm.isLoading = true;

      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.getOrder();

          vm.isLoading = false;

          console.log(response.data.message);
        } else {
          console.log(response.data.messate);
        }
      });
    },
    goHome() {
      const vm = this;

      vm.$router.push('/');
    },
  },
  created() {
    const vm = this;

    vm.getOrder();
  },
};
</script>

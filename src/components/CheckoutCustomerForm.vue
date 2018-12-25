<template>
  <div>
    <h5 class="py-3 mt-5 mb-2 text-center bg-light">訂購人資訊</h5>
    <form>
      <div class="form-group">
        <label for="exampleInputName">姓名：</label>
        <input
          type="text"
          class="form-control mb-2"
          id="exampleInputName"
          name="姓名"
          placeholder="請輸入姓名"
          v-model="name"
          v-validate="'required'"
        />
        <span class="text-danger" v-if="errors.has('姓名')">{{ errors.first('姓名') }}</span>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">信箱：</label>
        <input
          type="email"
          class="form-control mb-2"
          :class="{ 'is-invalid': errors.has('name') }"
          id="exampleInputEmail1"
          name="email"
          placeholder="請輸入信箱"
          v-validate="'required|email'"
          v-model="email"
        />
        <span class="text-danger" v-if="errors.has('email')"> {{ errors.first('email') }} </span>
      </div>
      <div class="form-group">
        <label for="exampleInputPhone">手機號碼：</label>
        <input
          type="tel"
          class="form-control mb-2"
          id="exampleInputPhone"
          name="手機號碼"
          placeholder="0912345678"
          v-model="phone"
          v-validate="{ required: true, regex: /^09\d{8}$/ }"
        />
        <span class="text-danger" v-if="errors.has('手機號碼')">{{
          errors.first('手機號碼')
        }}</span>
      </div>
      <div class="form-group">
        <label for="exampleInputAddress">地址：</label>
        <input
          type="text"
          class="form-control mb-2"
          id="exampleInputAddress"
          name="address"
          placeholder="請輸入地址"
          v-model="address"
          v-validate="'required'"
        />
        <span class="text-danger" v-if="errors.has('address')">請輸入地址</span>
      </div>
      <div class="form-group">
        <label for="exampleInputMessage">留言：</label>
        <textarea
          rows="4"
          cols="50"
          class="form-control"
          id="exampleInputMessage"
          name="message"
          placeholder="請輸入留言"
          v-model="message"
        >
        </textarea>
      </div>
      <div class="d-flex justify-content-center">
        <a href="shoppingCart.html" class="btn btn-primary mr-5" @click.prevent="goBack">上一步</a>
        <a href="shoppingCart-purchase.html" class="btn btn-danger" @click.prevent="sendOrder"
          >送出訂單</a
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      const vm = this;
      vm.$router.go(-1);
      vm.$bus.$emit('get-cart-count');
    },
    sendOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const order = {
        user: {
          name: vm.name,
          email: vm.email,
          tel: vm.phone,
          address: vm.address,
        },
        message: vm.message,
      };

      vm.isLoading = true;

      vm.$validator.validate().then(result => {
        if (!result) {
          // do stuff if not valid.
          vm.isLoading = false;

          console.log('請確認表單皆正確輸入');
        } else {
          vm.$http.post(api, { data: order }).then(response => {
            if (response.data.success) {
              vm.$bus.$emit('get-cart-count');

              vm.isLoading = false;

              vm.$router.push({
                name: 'CheckoutConfirmToPay',
                params: {
                  orderId: response.data.orderId,
                },
              });
            } else {
              console.log(response.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

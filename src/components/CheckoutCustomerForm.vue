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
          :value="name"
          @input="updateName"
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
          :value="email"
          @input="updateEmail"
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
          :value="phone"
          @input="updatePhone"
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
          :value="address"
          @input="updateAddress"
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
          :value="message"
          @input="updateMessage"
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
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('customerFormModules', ['name', 'email', 'phone', 'address', 'message']),
  },
  methods: {
    goBack() {
      const vm = this;
      vm.$router.go(-1);
      vm.$bus.$emit('get-cart-count');
    },
    sendOrder() {
      this.$validator.validate().then(result => {
        if (!result) {
          // do stuff if not valid.
          this.$store.dispatch('updateLoading', false, { root: true });
        } else {
          this.$store.dispatch('customerFormModules/sendOrder');
        }
      });
    },
    updateName(e) {
      this.$store.dispatch('customerFormModules/updateName', e.target.value);
    },
    updateEmail(e) {
      this.$store.dispatch('customerFormModules/updateEmail', e.target.value);
    },
    updatePhone(e) {
      this.$store.dispatch('customerFormModules/updatePhone', e.target.value);
    },
    updateAddress(e) {
      this.$store.dispatch('customerFormModules/updateAddress', e.target.value);
    },
    updateMessage(e) {
      this.$store.dispatch('customerFormModules/updateMessage', e.target.value);
    },
  },
};
</script>

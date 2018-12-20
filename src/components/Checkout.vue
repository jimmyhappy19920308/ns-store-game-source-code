<template>
  <div>
    <div class="container main-contant py-5">
      <p class="text-center mb-3 text-secondary h3">結帳</p>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div
            class="alert alert-rounded mb-0"
            :class="{
              'alert-success': this.$route.path === '/checkout',
            }"
            role="alert"
          >
            1.確認購物車內容
          </div>
        </div>
        <div class="col">
          <div
            class="alert alert-rounded mb-0"
            :class="{
              'alert-success': this.$route.path === '/checkout/checkout-customer-form',
            }"
            role="alert"
          >
            2.輸入收件人資料
          </div>
        </div>
        <div class="col">
          <div
            class="alert alert-rounded mb-0"
            :class="{
              'alert-success': this.$route.name === 'CheckoutConfirmToPay',
            }"
            role="alert"
          >
            3.訂單完成
          </div>
        </div>
      </section>
      <router-view></router-view>
    </div>
  </div>
</template>

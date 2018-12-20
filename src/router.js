import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'GameStore',
      component: () => import('./views/GameStore.vue'),
      children: [
        {
          path: '',
          name: 'Products',
          component: () => import('./components/Products.vue'),
        },
        {
          path: '/product-detail/:product',
          name: 'ProductDetail',
          component: () => import('./components/ProductDetail.vue'),
          props: true,
        },
        {
          path: '/checkout',
          // name: 'Checkout',
          component: () => import('./components/Checkout.vue'),
          children: [
            {
              path: '',
              name: 'CheckoutCartsDetail',
              component: () => import('./components/CheckoutCartsDetail.vue'),
            },
            {
              path: 'checkout-customer-form',
              name: 'CheckoutCustomerForm',
              component: () => import('./components/CheckoutCustomerForm.vue'),
            },
            {
              path: '/checkout-confirm-to-pay/:orderId',
              name: 'CheckoutConfirmToPay',
              component: () => import('./components/CheckoutConfirmToPay.vue'),
              props: true,
            },
          ],
        },
        {
          path: '/coupon',
          name: 'Coupon',
          component: () => import('./views/Coupon.vue'),
        },
      ],
    },
  ],
});

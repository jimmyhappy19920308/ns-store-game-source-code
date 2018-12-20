<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Carousel></Carousel>
    <div class="container main-contant mb-1">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <ProductsListGroup></ProductsListGroup>
        </div>
        <div class="col-md-9">
          <!-- 主要商品列表 (Card) -->
          <ProductsCard></ProductsCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from './Carousel.vue';
import ProductsListGroup from './ProductsListGroup.vue';
import ProductsCard from './ProductsCard.vue';

export default {
  components: {
    Carousel,
    ProductsListGroup,
    ProductsCard,
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
};
</script>

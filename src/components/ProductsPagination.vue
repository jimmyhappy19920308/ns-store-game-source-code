<template>
  <div>
    <nav aria-label="Page navigation" class="my-5">
      <ul class="pagination justify-content-center" v-if="$store.state['productsModules']['pagination']">
        <li
          class="page-item"
          :class="{ disabled: $store.state['productsModules']['pagination'].has_pre === false }"
          @click.prevent="getCurrentPage($store.state['productsModules']['pagination'].current_page - 1)"
        >
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li
          class="page-item"
          :class="{ active: $store.state['productsModules']['pagination'].current_page === page }"
          v-for="page in $store.state['productsModules']['pagination'].total_pages"
          :key="page"
        >
          <a class="page-link" href="#" @click.prevent="getCurrentPage(page)">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: $store.state['productsModules']['pagination'].has_next === false }"
          @click.prevent="getCurrentPage($store.state['productsModules']['pagination'].current_page + 1)"
        >
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    getCurrentPage(page) {
      // vm.$emit('get-current-page', page);
      this.$store.dispatch('productsModules/getProducts', page);
    },
  },
  created() {
    const vm = this;

    vm.getCurrentPage();
  },
};
</script>

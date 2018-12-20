<template>
  <div>
    <nav aria-label="Page navigation" class="my-5">
      <ul class="pagination justify-content-center" v-if="parentPagination">
        <li
          class="page-item"
          :class="{ disabled: parentPagination.has_pre === false }"
          @click.prevent="getCurrentPage(parentPagination.current_page - 1)"
        >
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li
          class="page-item"
          :class="{ active: parentPagination.current_page === page }"
          v-for="page in parentPagination.total_pages"
          :key="page"
        >
          <a class="page-link" href="#" @click.prevent="getCurrentPage(page)">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: parentPagination.has_next === false }"
          @click.prevent="getCurrentPage(parentPagination.current_page + 1)"
        >
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    parentPagination: {
      type: Object,
    },
  },
  methods: {
    getCurrentPage(page) {
      const vm = this;

      vm.$emit('get-current-page', page);
    },
  },
  created() {
    const vm = this;

    vm.getCurrentPage();
  },
};
</script>

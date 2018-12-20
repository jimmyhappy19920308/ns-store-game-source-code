<template>
  <div>
    <div class="d-flex mb-4">
      <!-- Search bar -->
      <form class="form-inline my-3 my-lg-0">
        <div class="input-group">
          <input
            class="form-control"
            type="text"
            placeholder="Search"
            aria-label="Search"
            v-model="keyword"
            @keyup.enter="searchKeyword"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-danger" type="submit" @click.prevent="searchKeyword">
              <i class="fa fa-search" aria-hidden="true"></i> Search
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    searchKeyword() {
      const vm = this;

      vm.$emit('search', vm.keyword);
    },
  },
};
</script>

<template>
  <div>
    <div class="list-group sticky-top">
      <a
        class="list-group-item list-group-item-action active"
        data-toggle="list"
        href="#"
        @click.prevent="selectCategory('All')"
      >
        <i class="fas fa-dice-d6"></i> 所有分類
      </a>
      <a
        class="list-group-item list-group-item-action"
        data-toggle="list"
        href="#"
        @click.prevent="selectCategory('角色扮演')"
      >
        <i class="fas fa-blind"></i> 角色扮演類
      </a>
      <a
        href="#"
        class="list-group-item list-group-item-action"
        data-toggle="list"
        @click.prevent="selectCategory('動作')"
      >
        <i class="fas fa-running"></i> 動作類
      </a>
      <a
        href="#"
        class="list-group-item list-group-item-action"
        data-toggle="list"
        @click.prevent="selectCategory('冒險遊戲')"
      >
        <i class="fas fa-fighter-jet"></i> 冒險遊戲類
      </a>
      <a
        href="#"
        class="list-group-item list-group-item-action"
        data-toggle="list"
        @click.prevent="selectCategory('其他(休閒)')"
      >
        <i class="fas fa-swimmer"></i> 其他(休閒)類
      </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectCategory(category) {
      const vm = this;

      vm.$bus.$emit('filter-category', category);
    },
  },
};
</script>

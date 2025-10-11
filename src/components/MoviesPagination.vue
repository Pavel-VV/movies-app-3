<template>
  <div class="movies-pagination">
    <BPagination
      v-model="currentPage"
      :total-rows="total"
      :per-page="perPage"
      next-text="Next"
      prev-text="Prev"
      hide-ellipsis
    />
  </div>
</template>

<script>
export default {
  name: "MoviesPagination",
  data: () => ({
    currentPageData: 1,
  }),
  props: {
    currPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.currPage;
      },
      set(value) {
        this.currentPageData = value;
        this.$emit("changeCurrentPage", value);
      },
    },
  },
};
</script>

<style scoped>
.movies-pagination {
  display: flex;
  justify-content: center;
}

.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  color: #fff;
}

.movies-pagination >>> .pagination .page-item.active .page-link {
  background-color: #fff;
  color: #000;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
  background-color: rgba(186, 186, 186, 0.5);
  color: #fff;
}
</style>

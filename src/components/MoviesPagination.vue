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
    currentPage: 1,
    perPage: 12,
    total: 200,
  }),
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

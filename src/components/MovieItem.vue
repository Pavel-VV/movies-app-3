<template>
  <div class="movie-item" :style="background">{{ movie.Title }}</div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    background() {
      return {
        "background-image": `url( ${this.movie.Poster} )`,
      };
    },
  },
};
</script>

<style scoped>
.movie-item {
  border-radius: 5px;
  margin-bottom: 30px;
  height: 400px;
  cursor: pointer;
  /* background-color: black; */
}
</style>

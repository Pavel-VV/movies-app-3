<template>
  <div class="movie-item">
    <div class="movie-item-poster" :style="posterBackground"></div>
  </div>
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
    posterBackground() {
      return {
        "background-image": `url( ${this.movie.Poster} )`,
      };
    },
  },
};
</script>

<style scoped>
.movie-item {
  position: relative;
  border-radius: 5px;
  margin-bottom: 30px;
  height: 400px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
}

.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.02);
}

.movie-item-poster {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>

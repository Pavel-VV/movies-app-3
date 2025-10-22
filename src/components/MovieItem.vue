<template>
  <div class="movie-item">
    <div class="movie-item-poster" :style="posterBackground"></div>
    <div class="movie-info-wrap">
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div class="control-panel">
        <BButton class="control-btn mr-2" variant="outline-light">Edit</BButton>
        <BButton
          class="control-btn ml-2"
          variant="outline-light"
          @click="eventDeleteMovies"
          >Delete</BButton
        >
      </div>
    </div>
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
  methods: {
    eventDeleteMovies() {
      this.$emit("onEventDeleteMovie", {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
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
  z-index: -1;
}

.movie-info-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px;
  opacity: 0;
  transition: all 0.2s ease;
  height: 100%;
}

.movie-item:hover .movie-info-wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}

.movie-title {
  font-size: 20px;
  color: #fff;
}

.movie-year {
  font-size: 14px;
  color: #fff;
}

.control-panel {
  display: flex;
  margin-top: 0;
}

.control-btn {
  width: 100%;
}
</style>

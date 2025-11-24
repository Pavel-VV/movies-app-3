<template>
  <div class="info-modal">
    <header class="header">
      <h6 class="movie-header-title">Movie info</h6>
      <p>{{ movie.Title }}</p>
      <BIcon class="close-info" icon="x" @click="eventCloseInfo" />
    </header>
    <div class="movie-info-wrap">
      <BRow>
        <BCol sm="4">
          <div class="movie-poster-wrap">
            <div class="movie-poster" :style="backgroundStyle"></div>
          </div>
        </BCol>
        <BCol class="movie-info" sm="8">
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <BFormRating readonly stars="10" v-model="movieRating" />
          <!-- <BTable>
            <BTbody>
              <BTr>
                <BTh>HI121</BTh>
                <BTd>Hello212</BTd>
              </BTr>
            </BTbody>
          </BTable> -->
        </BCol>
      </BRow>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieInfoModal",
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    defaultPoster: "linear-gradient(45deg, #270133, #940294)",
  }),
  methods: {
    eventCloseInfo() {
      this.$emit("onEventCloseInfo");
    },
  },
  computed: {
    backgroundPoster() {
      return this.movie.Poster
        ? `url(${this.movie.Poster})`
        : this.defaultPoster;
    },
    backgroundStyle() {
      return {
        "background-image": `${this.backgroundPoster}`,
      };
    },
    movieRating() {
      return this.movie.imdbRating;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-image: linear-gradient(45deg, #270133, #940294);
  color: #fff;
}

.movie-header-title {
  margin-bottom: 0;
}

.close-info {
  font-size: 1.5rem;
  cursor: pointer;
}

.movie-info-wrap {
  background-color: #fff;
  padding: 1rem;
}

.movie-poster-wrap {
  position: relative;
  padding-bottom: 150%;
  overflow: hidden;
  border-radius: 5px;
}

.movie-poster {
  position: absolute;
  background-size: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
}
</style>

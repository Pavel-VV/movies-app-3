<template>
  <BContainer>
    <h3 class="list-title">IMDB top 250</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="getMovieBg(movie.Poster)"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import MovieItem from "@/components/MovieItem";
export default {
  name: "MoviesList",
  components: { MovieItem },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
  },
  methods: {
    getMovieBg(bgUrl) {
      this.$emit("onGetMovieBg", bgUrl);
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>

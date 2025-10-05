<template>
  <div id="app">
    <FonBg :posterBg="movieBg" />
    <MoviesList :list="moviesList" @onGetMovieBg="getBgFon" />
  </div>
</template>

<script>
import MoviesList from "@/components/MoviesList";
import FonBg from "@/components/FonBg";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: { MoviesList, FonBg },
  data: () => ({
    movieBg: "",
  }),
  computed: {
    ...mapGetters("movies", ["moviesList"]),
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"]),
    getBgFon(bg) {
      this.movieBg = bg;
    },
  },
};
</script>

<style>
#app {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

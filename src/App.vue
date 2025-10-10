<template>
  <div id="app">
    <FonBg :posterBg="movieBg" />
    <MoviesList :list="moviesList" @onGetMovieBg="getBgFon" />
    <MoviesPagination
      :currPage="currentPage"
      :perPage="moviesPerPage"
      :total="totalMoviesLength"
    />
  </div>
</template>

<script>
import MoviesList from "@/components/MoviesList";
import FonBg from "@/components/FonBg";
import MoviesPagination from "@/components/MoviesPagination";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: { MoviesList, FonBg, MoviesPagination },
  data: () => ({
    movieBg: "",
  }),
  computed: {
    ...mapGetters("movies", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "totalMoviesLength",
    ]),
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

<template>
  <div id="app">
    <MoviesLoader />
    <ShowToast />
    <FonBg :posterBg="movieBg" />
    <MoviesHeader />
    <MoviesList :list="moviesList" @onGetMovieBg="getBgFon" />
    <MoviesPagination
      :currPage="currentPage"
      :perPage="moviesPerPage"
      :total="totalMoviesLength"
      @changeCurrentPage="onChangeCurrentPage"
    />
  </div>
</template>

<script>
import MoviesList from "@/components/MoviesList";
import FonBg from "@/components/FonBg";
import MoviesPagination from "@/components/MoviesPagination";
import MoviesLoader from "@/components/MoviesLoader";
import MoviesHeader from "@/components/MoviesHeader";
import ShowToast from "@/components/ShowToast";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    MoviesList,
    FonBg,
    MoviesPagination,
    MoviesLoader,
    MoviesHeader,
    ShowToast,
  },
  data: () => ({
    movieBg: "",
  }),
  watch: {
    "$route.query": {
      handler: "getQueryPage",
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapGetters("movies", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "totalMoviesLength",
    ]),
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    getQueryPage({ page = 1 }) {
      console.log(page);
      this.changeCurrentPage(Number(page));
    },
    getBgFon(bg) {
      this.movieBg = bg;
    },
    onChangeCurrentPage(value) {
      this.$router.push({ query: { page: value } });
      // console.log(this.$route);
      // this.changeCurrentPage(value);
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

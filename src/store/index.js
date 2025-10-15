import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";
import moviesLoader from "./modules/moviesLoader";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    moviesLoader,
  },
});

// store.dispatch("initMovies");

export default store;

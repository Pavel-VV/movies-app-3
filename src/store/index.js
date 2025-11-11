import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";
import moviesLoader from "./modules/moviesLoader";
import toast from "./modules/toasts";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    moviesLoader,
    toast,
  },
});

// store.dispatch("initMovies");

export default store;

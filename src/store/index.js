import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
  },
});

store.dispatch("initMovies");

export default store;

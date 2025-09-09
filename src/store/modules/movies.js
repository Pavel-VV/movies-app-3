import axios from "@/plagins/axios";

const moviesStore = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchMovies(context) {
      console.log(context);
      const response = await axios.get("/", {
        params: {
          apikey: process.env.VUE_APP_API_KEY,
          plot: "full",
          i: "tt0111161",
        },
      });
      console.log(response);
    },
  },
};

export default moviesStore;

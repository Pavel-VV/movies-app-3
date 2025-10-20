import axios from "@/plagins/axios";
import mutations from "@/store/mutations";
import IDs from "@/store/mock/imdb_top250";

function serializeMovies(movies) {
  const newList = movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
  return newList;
}

const { MOVIES, CURRENT_PAGE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
  },
  getters: {
    slicedIDs:
      ({ top250IDs }) =>
      (from, to) =>
        top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    totalMoviesLength: ({ top250IDs }) => top250IDs.length,
    moviesList: ({ movies }) => movies,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
  },
  actions: {
    // initMovies: {
    //   handler({ dispatch }) {
    //     dispatch("fetchMovies");
    //   },
    //   root: true,
    // },
    async fetchMovies({ getters, dispatch, commit }) {
      try {
        dispatch("changeStateLoader", true, { root: true });
        const { slicedIDs, moviesPerPage, currentPage } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedIDs(from, to);
        console.log(moviesToFetch);
        const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
        console.log(requests);
        // const response = await axios.get("/", {
        //   params: {
        //     i: "tt0111161",
        //   },
        // });
        const response = await Promise.all(requests);
        const movies = serializeMovies(response);
        console.log(movies);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("changeStateLoader", false, { root: true });
      }
    },
    changeCurrentPage({ dispatch, commit }, page) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies");
    },
  },
};

export default moviesStore;

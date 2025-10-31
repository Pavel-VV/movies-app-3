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

function serializeMoviesToIDs(movies) {
  const arrIDs = movies.reduce((acc, movie) => {
    acc.push(movie.imdbID);
    return acc;
  }, []);
  return arrIDs;
}

const { MOVIES, CURRENT_PAGE, DELETE_MOVIE, CHANGE_IDS } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    // top250IDs: IDs, нужно создать еще одни 250ids чтоб при стирании поиска востанавливались 250ids а при поиске опять записывались searchIDs
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
    [DELETE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [CHANGE_IDS](state, ids) {
      state.top250IDs = ids;
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
        // console.log(movies);
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
    deleteMovieId({ state, dispatch, commit }, id) {
      console.log(id);
      const movieIndex = state.top250IDs.indexOf(id);
      // const movieIndex = state.top250IDs.findIndex((value) => value === id);
      if (movieIndex !== -1) {
        commit(DELETE_MOVIE, movieIndex);
        dispatch("fetchMovies");
      }
    },
    async getSearchMovies({ dispatch, commit }, data) {
      try {
        dispatch("changeStateLoader", true, { root: true });
        console.log(dispatch);
        console.log(data);
        const searchMovies = await axios.get(`/?s=${data}`);
        console.log(searchMovies);
        if (searchMovies.Error) {
          throw Error(searchMovies.Error);
        }
        const ids = serializeMoviesToIDs(searchMovies.Search);
        console.log(ids);
        commit(CHANGE_IDS, ids);
        // нужно перезаписывать ids чтоб работала кнопка удаления 26.36
        const moviesIDs = serializeMovies(searchMovies.Search);
        console.log(moviesIDs);
        commit(MOVIES, moviesIDs);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch("changeStateLoader", false, { root: true });
      }
    },
  },
};

export default moviesStore;

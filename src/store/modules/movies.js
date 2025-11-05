import axios from "@/plagins/axios";
import mutations from "@/store/mutations";
import top250IDs from "@/store/mock/imdb_top250";

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

const {
  MOVIES,
  CURRENT_PAGE,
  DELETE_MOVIE,
  CHANGE_IDS,
  SAVE_MDF250IDS,
  TOGGLE_SEARCH,
} = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    IDs: top250IDs,
    modified250IDs: "",
    // top250IDs: IDs, нужно создать еще одни 250ids чтоб при стирании поиска востанавливались 250ids а при поиске опять записывались searchIDs
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    searchState: false,
  },
  getters: {
    slicedIDs:
      ({ IDs }) =>
      (from, to) =>
        IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    totalMoviesLength: ({ IDs }) => IDs.length,
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
      state.IDs.splice(index, 1);
    },
    [CHANGE_IDS](state, ids) {
      state.IDs = ids;
    },
    [SAVE_MDF250IDS](state, ids) {
      state.modified250IDs = ids;
    },
    [TOGGLE_SEARCH](state, bool) {
      state.searchState = bool;
    },
  },
  actions: {
    // initMovies: {
    //   handler({ dispatch }) {
    //     dispatch("fetchMovies");
    //   },
    //   root: true,
    // },
    async fetchMovies({ getters, dispatch, state, commit }) {
      try {
        dispatch("changeStateLoader", true, { root: true });
        if (!state.searchState && state.modified250IDs) {
          commit(CHANGE_IDS, state.modified250IDs);
        }
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
      const movieIndex = state.IDs.indexOf(id);
      // const movieIndex = state.top250IDs.findIndex((value) => value === id);
      if (movieIndex !== -1) {
        commit(DELETE_MOVIE, movieIndex);
        dispatch("fetchMovies");
      }
    },
    async getSearchMovies({ dispatch, commit, state }, data) {
      try {
        dispatch("changeStateLoader", true, { root: true });
        commit(SAVE_MDF250IDS, state.IDs);
        console.log(`сохраненные измененные 250 ${state.modified250IDs}`);
        const searchMovies = await axios.get(`/?s=${data}`);
        console.log(searchMovies);
        if (searchMovies.Error) {
          throw Error(searchMovies.Error);
        }
        const ids = serializeMoviesToIDs(searchMovies.Search);
        console.log(ids);
        commit(CHANGE_IDS, ids);
        // нужно перезаписывать ids чтоб работала кнопка удаления 26.36
        // реализовал при удалении поиска, восстанавливается модифицироанный IDs, теперь нужно реализовать измененение заголовка
        const moviesIDs = serializeMovies(searchMovies.Search);
        console.log(moviesIDs);
        commit(MOVIES, moviesIDs);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch("changeStateLoader", false, { root: true });
      }
    },
    toggleSearch({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
    },
  },
};

export default moviesStore;

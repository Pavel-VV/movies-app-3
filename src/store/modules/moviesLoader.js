import mutations from "@/store/mutations";

const { CHANGE_LOADER } = mutations;

const loader = {
  state: {
    stateLoader: false,
  },
  getters: {
    getStateLoader: ({ stateLoader }) => stateLoader,
  },
  mutations: {
    [CHANGE_LOADER](state, bool) {
      state.stateLoader = bool;
    },
  },
  actions: {
    changeStateLoader({ commit }, value) {
      commit(CHANGE_LOADER, value);
    },
  },
};

export default loader;

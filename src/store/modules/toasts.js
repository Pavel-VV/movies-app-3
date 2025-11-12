import mutations from "@/store/mutations";

const { ADD_TOAST } = mutations;

const toasts = {
  state: {
    toasts: [],
  },
  getters: {
    getLastToast: ({ toasts }) => toasts[toasts.length - 1],
  },
  mutations: {
    [ADD_TOAST](state, toast) {
      state.toasts.push(toast);
    },
  },
  actions: {
    addToast({ commit }, toast) {
      commit(ADD_TOAST, toast);
    },
  },
};

export default toasts;

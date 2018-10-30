import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProject: undefined
  },
  mutations: {
    selectProject(state, payload) {
      state.selectedProject = payload.pid;
    }
  },
  actions: {}
});

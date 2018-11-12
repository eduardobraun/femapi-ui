import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProject: localStorage.getItem("sharefem-selectedProject")
  },
  mutations: {
    selectProject(state, payload) {
      localStorage.setItem("sharefem-selectedProject", payload.pid);
      state.selectedProject = payload.pid;
    }
  },
  actions: {}
});

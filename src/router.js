import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

import UserMenu from "./components/UserMenu.vue";
import UserSettings from "./components/UserSettings.vue";

import ProjectMenu from "./components/ProjectMenu.vue";
import ProjectHome from "./components/ProjectHome.vue";
import ProjectDashboard from "./components/ProjectDashboard.vue";
import ProjectEditor from "./components/ProjectEditor.vue";
import ProjectTasks from "./components/ProjectTasks.vue";

Vue.use(Router);

// const ifNotAuthenticated = (to, from, next) => {
//   // if (!store.getters.isAuthenticated) {
//   //   next()
//   //   return
//   // }
//   next("/");
// };

const ifAuthenticated = (to, from, next) => {
  let token = localStorage.getItem("apollo-token");
  if (token) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: Home,
        drawer: UserMenu
      },
      beforeEnter: ifAuthenticated
    },
    {
      path: "/settings",
      name: "user-settings",
      components: {
        default: UserSettings,
        drawer: UserMenu
      },
      beforeEnter: ifAuthenticated
    },
    {
      path: "/project",
      components: {
        default: ProjectHome,
        drawer: ProjectMenu
      },
      props: { default: true, drawer: true },
      children: [
        {
          path: "/",
          name: "projecthome",
          component: ProjectDashboard,
          beforeEnter: ifAuthenticated
        },
        {
          path: "editor",
          name: "projecteditor",
          component: ProjectEditor,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/tasks",
          name: "projecttasks",
          component: ProjectTasks,
          beforeEnter: ifAuthenticated
        }
      ],
      beforeEnter: ifAuthenticated
    },
    {
      path: "/login",
      name: "login",
      meta: {
        public: true
      },
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

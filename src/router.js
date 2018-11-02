import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import CreateUser from "./views/CreateUser.vue";
import UserMenu from "./components/UserMenu.vue";

Vue.use(Router);

// const ifNotAuthenticated = (to, from, next) => {
//   // if (!store.getters.isAuthenticated) {
//   //   next()
//   //   return
//   // }
//   next("/");
// };
//

const ifAuthenticated = (to, from, next) => {
  let token = localStorage.getItem("apollo-token");
  if (token) {
    next();
    return;
  }
  next("/login");
};

const router = new Router({
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
        default: () =>
          import(/* webpackChunkName: "user_settings" */ "@/components/UserSettings.vue"),
        drawer: UserMenu
      },
      beforeEnter: ifAuthenticated
    },
    {
      path: "/project",
      components: {
        default: () =>
          import(/* webpackChunkName: "project_home" */ "@/components/ProjectHome.vue"),
        drawer: () =>
          import(/* webpackChunkName: "project_menu" */ "@/components/ProjectMenu.vue")
      },
      props: { default: true, drawer: true },
      children: [
        {
          path: "/",
          name: "projecthome",
          component: () =>
            import(/* webpackChunkName: "project_dashboard" */ "@/components/ProjectDashboard.vue"),
          beforeEnter: ifAuthenticated
        },
        {
          path: "editor",
          name: "projecteditor",
          component: () =>
            import(/* webpackChunkName: "project_editor" */ "@/components/ProjectEditor.vue"),
          beforeEnter: ifAuthenticated
        },
        {
          path: "/tasks",
          name: "projecttasks",
          component: () =>
            import(/* webpackChunkName: "project_tasks" */ "@/components/ProjectTasks.vue"),
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
      path: "/signup",
      name: "signup",
      meta: {
        public: true
      },
      component: CreateUser
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

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;

<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    dark
    app
    v-model="drawer"
    width="260"
    >
    <v-toolbar @click.native="goHome()" color="primary darken-1" class="pointer" dark>
      <!-- <img v-bind:src="computeLogo" height="36" alt="Vue Material Admin Template"> -->
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">ShareFEM</span>
      </v-toolbar-title>
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <slot></slot>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  name: "app-drawer",
  components: {
    VuePerfectScrollbar
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    mini: false,
    drawer: true,
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),
  computed: {
    computeGroupActive() {
      return true;
    },
    computeLogo() {
      return "/static/m.png";
    },

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    }
  },
  created() {
    window.getApp.$on("APP_DRAWER_TOGGLED", () => {
      this.drawer = !this.drawer;
    });
  },

  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    genChildTarget(item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component
        };
      }
      return { name: `${item.group}/${subItem.name}` };
    }
  }
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';
.pointer
  cursor: pointer

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto

</style>

<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer">
          <router-view name="drawer"></router-view>
        </app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
           <!-- App Footer -->
          <!-- <v-footer height="auto" class="white pa-3 app--footer"> -->
          <!--   <span class="caption">isocked.com Design &copy; {{ new Date().getFullYear() }}</span> -->
          <!--   <v-spacer></v-spacer> -->
          <!--   <span class="caption mr-1"> Make With Love </span> <v-icon color="pink" small>favorite</v-icon> -->
          <!-- </v-footer> -->
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <!-- <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings"> -->
        <!--   <v-icon>settings</v-icon> -->
        <!-- </v-btn> -->
        <!-- <v-navigation-drawer -->
        <!--   class="setting-drawer" -->
        <!--   temporary -->
        <!--   right -->
        <!--   v-model="rightDrawer" -->
        <!--   hide-overlay -->
        <!--   fixed -->
        <!--   > -->
        <!--   <theme-settings></theme-settings> -->
        <!-- </v-navigation-drawer> -->
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import PageHeader from "@/components/PageHeader";
export default {
  components: {
    AppDrawer,
    AppToolbar,
    PageHeader
  },
  data: () => ({
    expanded: true,
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  }),

  computed: {},

  created() {
    window.getApp = this;
  },
  methods: {}
};
</script>


<style lang="stylus">
  html
    overflow-y: auto !important;

  .page-wrapper
    min-height:calc(100vh - 64px - 50px - 81px );  
    height: 100%;

  .v-list__tile 
    padding: 0 6px !important;
</style>

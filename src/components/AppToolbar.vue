<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <!-- <v-toolbar-title class="ml-0 pl-3"> -->
    <!--   <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon> -->
    <!-- </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-icon large>account_circle</v-icon>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from "@/components/widgets/list/NotificationList";
import Util from "@/util";
import { onLogout } from "../vue-apollo";
export default {
  name: "app-toolbar",
  components: {
    NotificationList
  },
  data() {
    return {
      items: [
        {
          icon: "account_circle",
          href: "#",
          title: "Profile",
          click: e => {
            console.log(e);
          }
        },
        {
          icon: "settings",
          href: "#",
          title: "Settings",
          click: e => {
            console.log(e);
          }
        },
        {
          icon: "fullscreen_exit",
          title: "Logout",
          click: this.logout
        }
      ]
    };
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    handleDrawerToggle() {
      window.getApp.$emit("APP_DRAWER_TOGGLED");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    logout() {
      const apolloClient = this.$apollo.provider.defaultClient;
      onLogout(apolloClient);
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<template>
  <ApolloQuery
    ref="currentUser"
    :query="require('@/graphql/CurrentUser.gql')"
  >
  <v-card :color="color" ref="card" :dark="dark" slot-scope="{ result: { data } }">
    <template v-if="data">
    <v-card-text>
      <div class="layout ma-0 align-center row">
        <v-avatar :size="48" color="primary">
          <img v-bind:src="avatar.src" v-bind:alt="name" v-if="showAvatar">
          <span v-else class="white--text headline">{{ data.currentUser.name.toUpperCase().charAt(0) }}</span>
        </v-avatar>
        <div class="flex text-sm-right">
          <div class="subheading">{{ data.currentUser.name }}</div>
          <span class="caption"></span>
        </div>
      </div>
    </v-card-text>
    </template>
  </v-card>
  <v-list>
    <v-list-tile
      value="true"
      :to="'/'"
      exact-active-class="blue white--text"
      dark
    >
      <v-list-tile-action class="white--text">
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content class="white--text">
        <v-list-tile-title>Projects</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile
      value="true"
      :to="'/settings'"
      exact-active-class="blue white--text"
      dark
    >
      <v-list-tile-action class="white--text">
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content class="white--text">
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  </ApolloQuery>
</template>
<script>
export default {
  name: "UserMenu",
  components: {},
  props: {},
  data: () => {
    return {
      name: "Eduardo",
      showAvatar: false,
      color: "darkgrey",
      dark: true
    };
  },
  computed: {},

  methods: {}
};
</script>


<style lang="stylus">
  .caption, .subheading {
    font-weight:200;
  }
</style>

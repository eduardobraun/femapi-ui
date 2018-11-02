<template>
  <div>
    <ApolloQuery
    :query="require('../graphql/Project.gql')"
    :variables="{ id: id }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>

        <div v-else-if="error" class="error apollo">An error occured</div>

        <template v-else-if="data">
          <v-toolbar class="grey darken-2" height="30">
            <v-toolbar-title>{{ data.project.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon class="hidden-sm-and-down" @click.stop="miniV = !miniV"> -->
            <!--   <v-icon v-html="miniV ? 'chevron_right' : 'chevron_left'"></v-icon> -->
            <!-- </v-btn> -->
          </v-toolbar>
          <v-list>
            <v-list-tile
              value="true"
              :to="{ name: 'projecthome' }"
              exact-active-class="blue white--text"
              dark
            >
              <v-list-tile-action class="white--text">
                <v-icon>dashboard</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>Overview</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              value="true"
              :to="{ name: 'projecteditor' }"
              exact-active-class="blue white--text"
              dark
            >
              <v-list-tile-action class="white--text">
                <v-icon class="fa fa-code"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>Editor</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              value="true"
              :to="{ name: 'projecttasks'}"
              exact-active-class="blue white--text"
              dark
            >
              <v-list-tile-action class="white--text">
                <v-icon>assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>Tasks</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </template>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
export default {
  name: "ProjectMenu",
  components: {},
  props: {},
  data: () => {
    return {
      color: "darkgrey",
      dark: true
    };
  },
  computed: {
    id: function() {
      return this.$store.state.selectedProject;
    }
  },

  methods: {}
};
</script>


<style lang="stylus">
  .caption, .subheading {
    font-weight:200;
  }

  .v-list__tile 
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    height: 48px;
    margin: 0;
    padding: 0 6px;
    position: relative;
    text-decoration: none;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

</style>

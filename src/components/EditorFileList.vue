<template>
  <v-card class="elevation-6" dark>
        <v-toolbar height="30" color="grey" dark>
          <v-toolbar-title>Files</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon ripple>
            <v-icon color="white" right>fa-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <template v-if="items">
          <v-treeview
            v-model="tree"
            :open="open"
            :items="items"
            activatable
            item-key="path"
            open-on-click
          >
            <template slot="prepend" slot-scope="{ item, open, leaf }">
              <v-icon v-if="item.isDir">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ file_types[item.extension] }}
              </v-icon>
            </template>
          </v-treeview>
        </template>
  </v-card>
</template>
<script>
import PROJECT from "../graphql/Project.gql";

export default {
  name: "EditorFileList",
  components: {},
  props: {},
  apollo: {
    project: {
      query: PROJECT,
      variables() {
        return {
          id: this.id
        };
      }
    }
  },
  data: () => {
    return {
      open: [],
      file_types: {
        html: "mdi-language-html5",
        js: "mdi-nodejs",
        json: "mdi-json",
        md: "mdi-markdown",
        pdf: "mdi-file-pdf",
        png: "mdi-file-image",
        txt: "mdi-file-document-outline",
        xls: "mdi-file-excel"
      },
      tree: [],
      project: null
    };
  },

  computed: {
    id: function() {
      return this.$store.state.selectedProject;
    },
    items: function() {
      /*let fix = function(entry) {
        if (entry.isDir) {
          return {
            name: entry.name,
            path: entry.path,
            extension: entry.extension,
            children: entry.children.map(entry => {
              fix(entry);
            }),
            isDir: entry.isDir
          };
        } else {
          return {
            name: entry.name,
            path: entry.path,
            extension: entry.extension,
            children: undefined,
            isDir: entry.isDir
          };
        }
      };
      return this.project.files.map(entry => {
        fix(entry);
      });*/
      return this.project ? this.project.files : [];
    }
  },
  methods: {}
};
</script>


<style lang="stylus">
@import '../../node_modules/vuetify/src/stylus/components/_treeview'
</style>

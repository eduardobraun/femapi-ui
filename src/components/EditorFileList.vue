<template>
  <v-card class="elevation-6" dark>
    <v-toolbar height="30" color="grey" dark>
      <v-toolbar-title>Files</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon ripple>
        <v-icon color="white" right>fa-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-treeview
      v-model="tree"
      :open="open"
      :items="items"
      activatable
      item-key="name"
      open-on-click
    >
      <template slot="prepend" slot-scope="{ item, open, leaf }">
        <v-icon v-if="!item.file">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
      </template>
    </v-treeview>
  </v-card>
</template>
<script>
export default {
  name: "EditorFileList",
  components: {},
  props: {},
  data: () => {
    return {
      open: ["public"],
      files: {
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
      items: [
        {
          name: ".git"
        },
        {
          name: "node_modules"
        },
        {
          name: "public",
          children: [
            {
              name: "static",
              children: [
                {
                  name: "logo.png",
                  file: "png"
                }
              ]
            },
            {
              name: "favicon.ico",
              file: "png"
            },
            {
              name: "index.html",
              file: "html"
            }
          ]
        },
        {
          name: ".gitignore",
          file: "txt"
        },
        {
          name: "babel.config.js",
          file: "js"
        },
        {
          name: "package.json",
          file: "json"
        },
        {
          name: "README.md",
          file: "md"
        },
        {
          name: "vue.config.js",
          file: "js"
        },
        {
          name: "yarn.lock",
          file: "txt"
        }
      ]
    };
  },
  computed: {},

  methods: {}
};
</script>


<style lang="stylus">
@import '../../node_modules/vuetify/src/stylus/components/_treeview'
</style>

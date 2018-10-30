<template>
  <div class="doc-container">
    <div class="doc-toolbar">
      <v-toolbar dense dark>
        <v-btn color="primary">Mesh</v-btn>
        <v-btn color="primary">Space</v-btn>
        <v-btn color="primary">Function</v-btn>
        <v-btn color="primary">Expression</v-btn>
        <v-btn color="primary">Boundary</v-btn>
        <v-btn color="primary">Solver</v-btn>
        <v-spacer/>
        <v-btn color="success">Run</v-btn>
      </v-toolbar>
    </div>
      <div id="doc-editor"></div>
  </div>
</template>
<script>
import * as ace from "brace";
import "brace/mode/python";
import "brace/theme/monokai";

export default {
  name: "DocumentEditor",
  components: {},
  props: {},
  data: () => {
    return { editor: undefined };
  },
  computed: {},

  methods: {},

  mounted: function() {
    this.editor = ace.edit("doc-editor");
    this.editor.getSession().setMode("ace/mode/python");
    this.editor.setTheme("ace/theme/monokai");
  }
};
</script>


<style lang="stylus">
.doc-container
  display: grid;
  grid-template-rows: 48px auto;
  height: 100%;

.doc-toolbar
  grid-row-start: 1;
  grid-row-end: 2;

.doc-editor-container
  height: 100%;

#doc-editor
  grid-row-start: 2;
  grid-row-end: 3;
  height: 100%;
</style>

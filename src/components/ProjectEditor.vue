<template>
  <div class="editor">
    <EditorFileList/>
    <DocumentEditor/>
  </div>
</template>
<script>
import EditorFileList from "@/components/EditorFileList.vue";
import DocumentEditor from "@/components/DocumentEditor.vue";
export default {
  name: "ProjectEditor",
  components: {
    EditorFileList,
    DocumentEditor
  },
  props: {},
  data: () => {
    return {};
  },
  computed: {},

  methods: {}
};
</script>


<style lang="stylus">
.editor
  display: grid
  grid-template-columns: 200px auto
  height: 100%
</style>

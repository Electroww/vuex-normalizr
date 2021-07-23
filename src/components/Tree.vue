<template>
  <ul class="tree">
    <li class="folder" v-for="idFolder in tree" :key="idFolder">
      {{ folders[idFolder].label }}
      <ul class="areas">
        <li
          class="area"
          v-for="idArea in folders[idFolder].children"
          :key="idArea"
        >
          {{ areas[idArea].label }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tree",
  mounted() {
    this.$store.commit("loadTree");
    console.log(this.$store.state.tree);
  },
  computed: {
    areas() {
      return this.$store.state.tree.areas;
    },
    folders() {
      return this.$store.state.tree.folders;
    },
    tree() {
      return this.$store.state.tree.tree;
    },
  },
};
</script>


<style scoped>
.folder {
  font-weight: bold;
}
</style>

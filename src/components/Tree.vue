<template>
  <div>
    <ul class="tree">
      <li class="folder" v-for="idFolder in tree" :key="idFolder">
        {{ folders[idFolder].label }}
        <input
          type="text"
          placeholder="renommer"
          :value="folders[idFolder].label"
          @input="renameFolder(idFolder, $event)"
        />
        <ul class="areas">
          <li
            class="area"
            v-for="idArea in folders[idFolder].children"
            :key="idArea"
          >
            {{ areas[idArea].label }}
            <input
              type="text"
              placeholder="renommer"
              :value="areas[idArea].label"
              @input="renameArea(idArea, $event)"
            />
          </li>
        </ul>
      </li>
      <button @click="$store.commit('addFolder')">Ajouter Dossier</button>
    </ul>
    <button @click="$store.commit('saveTree')">
      Denormalize (see console.log)
    </button>
  </div>
</template>

<script>
export default {
  name: "Tree",
  mounted() {
    this.$store.commit("loadTree");
    console.log("normalized data :");
    console.log(this.$store.state.tree);
  },
  computed: {
    areas() {
      return this.$store.getters.getAllAreas;
    },
    folders() {
      return this.$store.getters.getAllFolders;
    },
    tree() {
      return this.$store.getters.getTree;
    },
  },
  methods: {
    renameArea(id, { target: { value }}) {
      this.$store.dispatch('renameArea', { id, value })
    },
    renameFolder(id, { target: { value }}) {
      this.$store.dispatch('renameFolder', { id, value })
    }
  },
};
</script>


<style scoped>
.folder {
  font-weight: bold;
  margin-bottom: 20px;
}
.areas {
  margin-top: 10px;
}
</style>


import Vue from 'vue'
import Vuex from 'vuex'
import { schema, normalize, denormalize } from 'normalizr'

import dataTree from "../data/tree"

Vue.use(Vuex)

const areaSchema = new schema.Entity('areas')
const folderSchema = new schema.Entity('folders', {
    children: [areaSchema]
})

const tree = {
    state: {
        tree: [],
        folders: {},
        areas: {}
    },
    mutations: {
        loadTree(state) {
            const { entities: { areas, folders }, result } = normalize(dataTree, [folderSchema])
            state.tree = result
            state.folders = folders
            state.areas = areas
        },
        addFolder(state) {
            const id = Object.keys(state.folders).length + 1
            Vue.set(state.folders, id, {
                id: id,
                label: "Nouveau Dossier",
                children: []
            })
            state.tree.push(id)
        },
        saveTree(state) {
            const entities = (({ folders, areas }) => ({ folders, areas }))(state);
            const denormalizedTree = denormalize(state.tree, [folderSchema], entities)
            console.log("Données Dénormalisées :")
            console.log(denormalizedTree)
        }
    },
    actions: {
        loadTree(context) {
            context.commit('loadTree')
        },
        addFolder(context) {
            context.commit('addFolder')
        },
        saveTree(context) {
            context.commit('saveTree')
        }
    }
}

const store = new Vuex.Store({
    modules: {
        tree
    }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import { schema, normalize } from 'normalizr'

import dataTree from "../data/tree"

Vue.use(Vuex)

const areaSchema = new schema.Entity('areas')
const folderSchema = new schema.Entity('folders', {
    children: [areaSchema]
})
const treeSchema = new schema.Array(folderSchema)

const tree = {
    state: {
        tree: [],
        folders: {},
        areas: {}
    },
    mutations: {
        loadTree(state) {
            const { entities: { areas, folders }, result } = normalize(dataTree, treeSchema)
            state.tree = result
            state.folders = folders
            state.areas = areas
        }
    },
    actions: {
        loadTree(context) {
            context.commit('loadTree')
        }
    }
}

const store = new Vuex.Store({
    modules: {
        tree
    }
})

export default store
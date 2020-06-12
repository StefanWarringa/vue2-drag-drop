import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import {uuid} from "./utils";

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
    state: {
        board: defaultBoard
    },
    getters: {
        getTaskById(state) {
            return (id) => {
                for (const column of state.board.columns) {
                    for (const task of column.tasks) {
                        if (task.id === id) {
                            return task
                        }
                    }
                }
            }
        }
    },
    mutations: {
        CREATE_TASK(state, {tasks, name}) {
            tasks.push({
                id: uuid(),
                name: name,
                description: ''
            })
        },
        UPDATE_TASK(state, {task,key,value}){
            Vue.set(task, key, value)
        }
    }
})

import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  state: {
    board: board
  },
  getters: {
    getTaskById (state) {
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
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name: name,
        tasks: []
      })
    },
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        id: uuid(),
        name: name,
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      Vue.set(task, key, value)
    },
    MOVE_TASK (state, { fromColumnIndex, fromTaskIndex, toColumnIndex, toTaskIndex }) {
      const fromTasks = state.board.columns[fromColumnIndex].tasks
      const task = fromTasks.splice(fromTaskIndex, 1)[0]
      const toTasks = state.board.columns[toColumnIndex].tasks
      if (toTaskIndex === undefined) {
        toTaskIndex = toTasks.length
      }
      toTasks.splice(toTaskIndex, 0, task)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      if (fromColumnIndex === toColumnIndex) return
      const column = state.board.columns.splice(fromColumnIndex, 1)[0]
      state.board.columns.splice(toColumnIndex, 0, column)
    }
  }
})

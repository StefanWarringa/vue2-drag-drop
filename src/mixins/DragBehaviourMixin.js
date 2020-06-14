export default {
  props: {
    columnIndex: { type: Number, required: true },
    taskIndex: { type: Number, required: false }
  },
  methods: {
    moveTaskOrColumn (transferData) {
      switch (transferData.dropType) {
        case 'task':
          this.moveTask(transferData)
          break
        case 'column':
          this.moveColumn(transferData)
          break
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      this.$store.commit('MOVE_TASK', {
        fromColumnIndex: fromColumnIndex,
        fromTaskIndex: fromTaskIndex,
        toColumnIndex: this.columnIndex,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn ({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex: fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
  }
}

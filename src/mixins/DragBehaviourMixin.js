export default {
  props: {
    columnIndex: { type: Number, required: true },
    taskIndex: { type: Number, required: false }
  },
  methods: {
    pickupColumn (evt) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('drop-type', 'column')
      evt.dataTransfer.setData('from-column-index', this.columnIndex.toString())
    },
    pickupTask (evt) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('drop-type', 'task')
      evt.dataTransfer.setData('from-column-index', this.columnIndex.toString())
      evt.dataTransfer.setData('from-task-index', this.taskIndex.toString())
    },
    dispatchDrop (evt) {
      const dropType = evt.dataTransfer.getData('drop-type')
      switch (dropType) {
        case 'task':
          this.moveTask(evt)
          // Prevent drop to propagate to containing column when drop-target is task
          evt.stopPropagation()
          break
        case 'column':
          this.moveColumn(evt)
          // Prevent drop to propagate to containing column when drop-target is task
          evt.stopPropagation()
          break
        default:
          evt.cancel()
      }
    },
    moveTask (evt) {
      const fromColumnIndex = evt.dataTransfer.getData('from-column-index')
      const fromTaskIndex = evt.dataTransfer.getData('from-task-index')
      this.$store.commit('MOVE_TASK', {
        fromColumnIndex: fromColumnIndex,
        fromTaskIndex: fromTaskIndex,
        toColumnIndex: this.columnIndex,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn (evt) {
      const fromColumnIndex = evt.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex: fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
  }
}

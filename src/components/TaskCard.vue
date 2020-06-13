<template>
  <div class="task"
       @click="openTask(task)"
       draggable
       @dragstart="pickupTask($event)"
       @drop="receiveDrop($event)">
    <span class="w-full flex-no-shrink font-bold">{{task.name}}</span>
    <p v-if="task.description" class="w-full flex-no-shrink mt-2 text-sm">{{task.description}}</p>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: { type: Object, required: true },
    taskIndex: { type: Number, required: true },
    columnIndex: { type: Number, required: true }
  },
  methods: {
    openTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask (evt) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('drop-type', 'task')
      evt.dataTransfer.setData('from-column-index', this.columnIndex.toString())
      evt.dataTransfer.setData('from-task-index', this.taskIndex.toString())
    },
    receiveDrop (evt) {
      const dropType = evt.dataTransfer.getData('drop-type')
      switch (dropType) {
        case 'task':
          const fromColumnIndex = evt.dataTransfer.getData('from-column-index')
          const fromTaskIndex = evt.dataTransfer.getData('from-task-index')
          this.moveTask(evt, fromColumnIndex, fromTaskIndex)
          // Prevent drop to propagate to containing column when drop-target is task
          evt.stopPropagation()
          break
        default:
          evt.cancel()
      }
    },
    moveTask (evt, fromColumnIndex, fromTaskIndex) {
      this.$store.commit('MOVE_TASK', {
        fromColumnIndex: fromColumnIndex,
        fromTaskIndex: fromTaskIndex,
        toColumnIndex: this.columnIndex,
        toTaskIndex: this.taskIndex
      })
    }
  }
}
</script>

<style scoped>

</style>

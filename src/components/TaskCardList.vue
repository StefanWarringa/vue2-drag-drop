<template>
    <div class="column"
         @drop="receiveDrop($event,index)"
         draggable
         @dragover.prevent
         @dragenter.prevent
         @dragstart.self="pickupColumn($event, index)">
        <div class="flex items-center mb-4 font-bold">
            {{column.name}}
        </div>
        <div class="list-reset">
            <div class="task"
                 v-for="(task, $taskIndex) in column.tasks" :key="$taskIndex"
                 @click="openTask(task)"
                 draggable
                 @dragstart="pickupTask($event,index,$taskIndex)"
                 @drop="receiveDrop($event,index,$taskIndex)">
                <span class="w-full flex-no-shrink font-bold">{{task.name}}</span>
                <p v-if="task.description" class="w-full flex-no-shrink mt-2 text-sm">{{task.description}}</p>
            </div>
            <input
              type="text"
              class="block p-2 w-full bg-transparent"
              placeholder="Enter new task"
              @keyup.enter="createTask(column.tasks,$event)"
            />
        </div>
    </div>
</template>

<script>
export default {
  name: 'TaskCardList',
  props: {
    column: { type: Object, required: true },
    index: { type: Number, required: true }
  },
  methods: {
    createTask (tasks, evt) {
      this.$store.commit(
        'CREATE_TASK',
        { tasks, name: evt.target.value }
      )
      evt.target.value = ''
    },
    openTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask (evt, fromColumnIndex, taskIndex) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('drop-type', 'task')
      evt.dataTransfer.setData('from-column-index', fromColumnIndex)
      evt.dataTransfer.setData('from-task-index', taskIndex)
    },
    pickupColumn (evt, fromColumnIndex) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('drop-type', 'column')
      evt.dataTransfer.setData('from-column-index', fromColumnIndex)
    },
    receiveDrop (evt, columnIndex, taskIndex) {
      const dropType = evt.dataTransfer.getData('drop-type')
      switch (dropType) {
        case 'task':
          this.moveTask(evt, columnIndex, taskIndex)
          // Prevent drop to propagate to containing column when drop-target is task
          evt.stopPropagation()
          break
        case 'column':
          this.moveColumn(evt, columnIndex)
          // Prevent drop to propagate to containing column when drop-target is task
          evt.stopPropagation()
          break
        default:
          evt.cancel()
      }
    },
    moveTask (evt, toColumnIndex, toTaskIndex) {
      const fromColumnIndex = evt.dataTransfer.getData('from-column-index')
      const fromTaskIndex = evt.dataTransfer.getData('from-task-index')
      this.$store.commit('MOVE_TASK', {
        fromColumnIndex: fromColumnIndex,
        fromTaskIndex: fromTaskIndex,
        toColumnIndex: toColumnIndex,
        toTaskIndex: toTaskIndex
      })
    },
    moveColumn (evt, toColumnIndex) {
      const fromColumnIndex = evt.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex: fromColumnIndex,
        toColumnIndex: toColumnIndex
      })
    }
  }
}
</script>

<style scoped>
    .column {
        @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
        min-width: 350px;
    }
    .task {
        @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
    }
</style>
<template>
    <div class="column"
         @drop="receiveDrop($event)"
         draggable
         @dragover.prevent
         @dragenter.prevent
         @dragstart.self="pickupColumn($event, columnIndex)">
        <div class="flex items-center mb-4 font-bold">
            {{column.name}}
        </div>
        <div class="list-reset">
            <TaskCard
              v-for="(task, $taskIndex) in column.tasks"
              :key="$taskIndex"
              :columnIndex="columnIndex"
              :taskIndex="$taskIndex"
              :task="task"
            />
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
import TaskCard from '@/components/TaskCard'

export default {
  name: 'TaskCardList',
  components: { TaskCard },
  props: {
    column: { type: Object, required: true },
    columnIndex: { type: Number, required: true }
  },
  methods: {
    createTask (tasks, evt) {
      this.$store.commit(
        'CREATE_TASK',
        { tasks, name: evt.target.value }
      )
      evt.target.value = ''
    },
    pickupColumn (evt) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('drop-type', 'column')
      evt.dataTransfer.setData('from-column-index', this.columnIndex.toString())
    },
    receiveDrop (evt) {
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

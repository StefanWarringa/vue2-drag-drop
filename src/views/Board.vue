<template xmlns:input="http://www.w3.org/1999/html">
    <div class="board">
        <div class="flex flex-row items-start">
            <div class="column"
                 v-for="(col, $colidx) of board.columns" :key="$colidx"
                 @drop="receiveDrop($event,$colidx)"
                 draggable
                 @dragover.prevent
                 @dragenter.prevent
                 @dragstart.self="pickupColumn($event, $colidx)">
                <div class="flex items-center mb-4 font-bold">
                    {{col.name}}
                </div>

                <div class="list-reset">
                    <div class="task"
                         v-for="(task, $taskidx) in col.tasks" :key="$taskidx"
                         @click="openTask(task)"
                         draggable
                         @dragstart="pickupTask($event,$colidx,$taskidx)"
                         @drop="receiveDrop($event,$colidx,$taskidx)">
                        <span class="w-full flex-no-shrink font-bold">{{task.name}}</span>
                        <p v-if="task.description" class="w-full flex-no-shrink mt-2 text-sm">{{task.description}}</p>
                    </div>
                    <input
                            type="text"
                            class="block p-2 w-full bg-transparent"
                            placeholder="Enter new task"
                            @keyup.enter="createTask(col.tasks,$event)">
                </div>
            </div>
            <div class="column flex">
                <input
                   type="text"
                   placeholder="New column"
                   class="p-2 mr-2 flex-grow"
                   v-model="newColumnName"
                   @keyup.enter="createColumn"
                />
            </div>
        </div>

        <!-- Don't close when clicking on the card itself  -->
        <div class="task-bg" v-if="this.$route.name === 'task'" @click.self="closeTask">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: mapState(['board']),
  methods: {
    createColumn () {
      this.$store.commit('CREATE_COLUMN', { name: this.newColumnName })
      this.newColumnName = ''
    },
    openTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    closeTask () {
      this.$router.back()
    },
    createTask (tasks, evt) {
      this.$store.commit(
        'CREATE_TASK',
        { tasks, name: evt.target.value }
      )
      evt.target.value = ''
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

<style lang="css">
    .task {
        @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
    }

    .column {
        @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
        min-width: 350px;
    }

    .board {
        @apply p-4 bg-teal-dark h-full overflow-auto;
    }

    .task-bg {
        @apply pin absolute;
        background: rgba(0, 0, 0, 0.5);
    }
</style>

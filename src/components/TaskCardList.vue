<template>
    <div class="column"
         @drop="dispatchDrop($event)"
         draggable
         @dragover.prevent
         @dragenter.prevent
         @dragstart.self="pickupColumn($event)">
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
import DragBehaviourMixin from '@/mixins/DragBehaviourMixin'

export default {
  name: 'TaskCardList',
  components: { TaskCard },
  mixins: [ DragBehaviourMixin ],
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

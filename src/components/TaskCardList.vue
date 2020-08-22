<template>
    <AppDroppableContainer @drop="this.moveTaskOrColumn">
        <AppDraggableContainer class="column"
          :transferData="{
            dropType: 'column',
            fromColumnIndex: this.columnIndex
          }">
            <div class="flex items-center mb-4 font-bold">
                <input
                  v-show="edit_column"
                  :ref="column_name_input_ref"
                  type="text"
                  :value="column.name"
                  class="block p-2 w-full bg-transparent"
                  @keydown.enter="updateColumnName(column,$event)"
                  @keydown.tab="updateColumnName(column,$event)"
                  @blur="edit_column=false"
                />
                <button class="column-name" v-show="!edit_column" @click="editColumn(column)">
                    {{column.name}}
                </button>
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
                  @keydown.enter="createTask(column,$event)"
                  @keydown.tab="createTask(column,$event)"
                />
            </div>
        </AppDraggableContainer>
    </AppDroppableContainer>
</template>

<script>
import TaskCard from '@/components/TaskCard'
import DragBehaviourMixin from '@/mixins/DragBehaviourMixin'
import AppDraggableContainer from '@/components/AppDraggableContainer'
import AppDroppableContainer from '@/components/AppDroppableContainer'

export default {
  name: 'TaskCardList',
  components: { TaskCard, AppDraggableContainer, AppDroppableContainer },
  mixins: [ DragBehaviourMixin ],
  props: {
    column: { type: Object, required: true },
    columnIndex: { type: Number, required: true }
  },
  data () {
    return {
      edit_column: false
    }
  },
  computed: {
    column_name_input_ref () {
      return 'column_name_input_' + this.columnIndex
    }
  },
  methods: {
    createTask (column, evt) {
      this.$store.commit(
        'CREATE_TASK',
        { tasks: column.tasks, name: evt.target.value }
      )
      evt.target.value = ''
    },
    updateColumnName (column, evt) {
      const newName = evt.target.value
      if (newName !== column.name) {
        this.$store.commit(
          'UPDATE_COLUMN',
          { column, key: 'name', value: evt.target.value }
        )
      }
      this.edit_column = false
    },
    editColumn (column) {
      this.edit_column = true
      // The input is present only after virtual dom has been re-rendered!
      this.$nextTick(() => {
        const nameInput = this.$refs[this.column_name_input_ref]
        nameInput.focus()
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

    .column-name:focus {
        outline: none;
        box-shadow: none;
    }
</style>

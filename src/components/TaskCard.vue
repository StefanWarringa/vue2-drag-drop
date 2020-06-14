<template>
  <AppDroppableContainer @drop="this.moveTaskOrColumn">
    <AppDraggableContainer class="task" @click="openTask(task)"
      :transferData="{
            dropType: 'task',
            fromColumnIndex: this.columnIndex,
            fromTaskIndex: this.taskIndex
          }">
        <span class="w-full flex-no-shrink font-bold">{{task.name}}</span>
        <p v-if="task.description" class="w-full flex-no-shrink mt-2 text-sm">{{task.description}}</p>
    </AppDraggableContainer>
  </AppDroppableContainer>
</template>

<script>
import DragBehaviourMixin from '@/mixins/DragBehaviourMixin'
import AppDraggableContainer from '@/components/AppDraggableContainer'
import AppDroppableContainer from '@/components/AppDroppableContainer'

export default {
  name: 'TaskCard',
  mixins: [ DragBehaviourMixin ],
  components: { AppDraggableContainer, AppDroppableContainer },
  props: {
    task: { type: Object, required: true },
    taskIndex: { type: Number, required: true },
    columnIndex: { type: Number, required: true }
  },
  methods: {
    openTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style scoped>
  .task {
    @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
  }
</style>

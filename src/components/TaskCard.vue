<template>
  <div class="task"
       @click="openTask(task)"
       draggable
       @dragstart="pickupTask($event)"
       @drop="dispatchDrop($event)">
    <span class="w-full flex-no-shrink font-bold">{{task.name}}</span>
    <p v-if="task.description" class="w-full flex-no-shrink mt-2 text-sm">{{task.description}}</p>
  </div>
</template>

<script>
import DragBehaviourMixin from '@/mixins/DragBehaviourMixin'

export default {
  name: 'TaskCard',
  mixins: [ DragBehaviourMixin ],
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

</style>

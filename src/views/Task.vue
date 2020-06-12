<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input type="text"
         class="p-2 mr-2 flex-grow text-xl font-bold w-full"
         :value="task.name"
          @change="updateTaskProperty($event,'name')">
      <textarea
          class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal w-full"
          :value="task.description"
          @change="updateTaskProperty($event,'description')"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTaskById']),
    task () {
      return this.getTaskById(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty(evt, key){
      this.$store.commit(
            'UPDATE_TASK',
            {
              task: this.task,
              key: key,
              value: evt.target.value
            })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>

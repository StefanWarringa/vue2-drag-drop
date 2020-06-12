<template xmlns:input="http://www.w3.org/1999/html">
    <div class="board">
        <div class="flex flex-row items-start">
            <div class="column"
                 v-for="(col, $colidx) of board.columns" :key="$colidx"
                 @drop="moveTask($event,$colidx)"
                 @dragover.prevent
                 @dragenter.prevent>

                <div class="flex items-center mb-4 font-bold">
                    {{col.name}}
                </div>

                <div class="list-reset">
                    <div class="task"
                         v-for="(task,$taskidx) in col.tasks" :key="$taskidx"
                         @click="openTask(task)"
                         draggable
                         @dragstart="pickupTask($event,$colidx,$taskidx)">

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
        </div>

        <!-- Don't close when clicking on the card itself  -->
        <div class="task-bg" v-if="this.$route.name === 'task'" @click.self="closeTask">
            <router-view/>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed: mapState(['board']),
    methods: {
    openTask(task) {
        this.$router.push({name: 'task', params: {id: task.id}})
    },
    closeTask() {
        this.$router.back()
    },
    createTask(tasks, evt){
      this.$store.commit(
        'CREATE_TASK',
        {tasks,name: evt.target.value}
      )
      evt.target.value = ''
    },
    pickupTask(evt,fromColumnIndex,taskIndex){
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('from-column-index', fromColumnIndex)
      evt.dataTransfer.setData('task-index', taskIndex)
    },
    moveTask(evt, toColumnIndex){
        const fromColumnIndex = evt.dataTransfer.getData('from-column-index');
        const taskIndex = evt.dataTransfer.getData('task-index');
        this.$store.commit('MOVE_TASK',{
            fromColumnIndex: fromColumnIndex,
            toColumnIndex: toColumnIndex,
            taskIndex: taskIndex
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

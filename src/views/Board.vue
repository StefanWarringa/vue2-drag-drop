<template xmlns:input="http://www.w3.org/1999/html">
    <div class="board">
        <div class="flex flex-row items-start">
            <TaskCardList
              v-for="(col, $colidx) of board.columns" :key="$colidx"
              :column="col"
              :columnIndex="$colidx"
            />
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
import TaskCardList from '@/components/TaskCardList'

export default {
  components: { TaskCardList },
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
    closeTask () {
      this.$router.back()
    }
  }
}
</script>

<style lang="css">
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

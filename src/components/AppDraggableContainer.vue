<template>
  <div
    draggable
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="onDragStart($event)"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppDraggableContainer',
  props: {
    transferData: { type: Object, required: true }
  },
  methods: {
    onDragStart (evt) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    }
  }
}
</script>

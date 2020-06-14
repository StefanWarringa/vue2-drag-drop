<template>
  <div
    @drop.stop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppDroppableContainer',
  methods: {
    onDrop (evt) {
      const transferData = JSON.parse(evt.dataTransfer.getData('payload'))
      this.$emit('drop', transferData)
    }
  }
}
</script>

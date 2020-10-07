<template>
  <div class="task-card my-style">
    <div>
      <h4>{{ model.title }}</h4>
      <p>{{ model.description }}</p>
    </div>
    <div>
      <button @click="emitOnDone" v-if="!model.status">✅</button>
      <button @click="emitOnRemove" v-else>❌</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['onDone', 'onRemove'],
  props: {
    model: {
      required: true,
      default: {
        id: 0,
        title: 'Create video',
        description: 'And upload on YouTube',
        status: false
      }
    }
  },
  setup(props, { emit }) {
    const emitOnDone = () => {
      emit('onDone')
    }

    const emitOnRemove = () => {
      emit('onRemove')
    }

    return {
      emitOnDone,
      emitOnRemove
    }
  }
}
</script>

<style scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<template>
  <main>
    <TaskInput @onAddTask="addTask"></TaskInput>
    <ul class="task-list my-list">
      <li v-for="item in taskList" :key="item.id">
        <TaskCard @onRemove="removeTask(item.id)" @onDone="setDoneTask(item.id)" :model="item"></TaskCard>
      </li>
    </ul>
  </main>
</template>

<script>
import TaskInput from "./components/TaskInput.vue";
import TaskCard from "./components/TaskCard.vue";
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    TaskCard,
    TaskInput
  },
  setup() {
    const taskList = ref([{id: 0, title: 'Create video', description: 'And upload on YT', status: false}])

    const addTask = ({title, description}) => {
      taskList.value = [...taskList.value, {id: taskList.value[taskList.value.length - 1].id + 1, title, description, status: false}]
    }

    const setDoneTask = (id) => {
      taskList.value = taskList.value.map(x => {
        if(x.id === id)
          x.status = true
        return x
      })
    }

    const removeTask = (id) => {
      taskList.value = taskList.value.filter(x => x.id !== id)
    }

    return {
      taskList,
      addTask,
      removeTask,
      setDoneTask
    }
  }
}
</script>

<style scoped>
  .task-list {
    list-style: none;
  }
</style>
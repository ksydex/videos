<template>
  <div>
    <div v-for="category in categories"
         :key="category.id"
         @drop="onDrop($event, category.id)"
         class="droppable"
         @dragover.prevent
         @dragenter.prevent>
      <h4>{{ category.title }}</h4>
      <div v-for="item in items.filter(x => x.categoryId === category.id)"
           @dragstart="onDragStart($event, item)"
           class="draggable"
           draggable="true">
        <h5>{{ item.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const items = ref([
      {
        id: 0,
        title: 'Audi',
        categoryId: 0
      },
      {
        id: 1,
        title: 'BMW',
        categoryId: 0
      },
      {
        id: 2,
        title: 'Cat',
        categoryId: 1
      },
    ])
    const categories = ref([
      {
        id: 0,
        title: 'Cars'
      },
      {
        id: 1,
        title: 'Animals'
      }
    ])

    function onDragStart(e: DragEvent, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    }

    function onDrop(e: DragEvent, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      items.value = items.value.map(x => {
        if (x.id == itemId)
          x.categoryId = categoryId
        return x
      })
    }

    return {
      items,
      categories,
      onDragStart,
      onDrop
    }
  }
}
</script>

<style scoped>
.droppable {
  padding: 15px;
  border-radius: 5px;
  background: #2c3e50;
  margin-bottom: 10px;
}

.droppable h4 {
  color: white;
}

.draggable {
  background: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.draggable h5 {
  margin: 0;
}
</style>
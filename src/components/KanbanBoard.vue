KanbanBoard.vue
<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Board from '@/components/Board.vue'

export type Task = {
  id: string;
  title: string;
  body: string;
  board: number;
}

// board names + colors
const BoardTitles = ref(["Backlog", "In Progress", "Done"])
const BoardColors = ref(["yellow", "sky", "green"])

// Dette ville være et kald til en API, der leverer alle opgaverne
const tasks = ref<Task[]>([])


const tasksByBoard = (board: number) =>
  tasks.value.filter(task => task.board === board)

// Når vi tilføjer en opgave, så appender vi unik id for bedre lookup
const handleTaskAdded = (newTask: { title: string; body: string; board: number }) =>  {
  const taskWithId: Task = { ...newTask, id: uuidv4() }
  tasks.value.push(taskWithId)
}


const handleTaskEdited =(updatedTask: { id: string; title: string; body: string; board: number }) => {
    // finder opgaven gennem id
  const index = tasks.value.findIndex(t => t.id === updatedTask.id)

  // redundant if statement, kan fjernes i dette tilfælde
  if (index !== -1) {
    tasks.value[index] = updatedTask
  }
}

// Når vi flytter en task til et andet board
const updateTaskBoard = (taskId: string, newBoard: number) => {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.board = newBoard
  }
}

const handleTaskDeleted = (taskId: string) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId)
}
</script>

<template>
  <div class="flex gap-4 p-4">
    <Board
      v-for="(title, index) in BoardTitles"
      :key="index"
      :title="title"
      :color="BoardColors[index]"
      :board="index"
      :tasks="tasksByBoard(index)"
      @task-dropped="updateTaskBoard"
      @task-added="handleTaskAdded"
      @task-edited="handleTaskEdited"
      @task-deleted="handleTaskDeleted"
    />
  </div>
</template>

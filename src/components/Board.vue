<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue'
import Form from '@/components/Form.vue'
import type { Task } from '@/components/KanbanBoard.vue'

// Props received from the parent.
const props = defineProps({
  title: { type: String, required: true },
  color: { type: String, required: true },
  board: { type: Number, required: true },
  tasks: { type: Array as () => Task[], required: true }
})

// toast states
const snackbar = ref(false)
const snackbarText = ref("")

// task states
const showNewTaskForm = ref(false)
const isEditing = ref(false)
const currentTask = ref<Task | null>(null)

// Alt der har med task manipulering at gøre bliver sendt til parent component (kanbanBoard)
const emit = defineEmits<{
  (event: 'task-dropped', taskId: string, newBoard: number): void;
  (event: 'task-added', newTask: { title: string; body: string; board: number }): void;
  (event: 'task-edited', updatedTask: { id: string; title: string; body: string; board: number }): void;
  (event: 'task-deleted', taskId: string): void;
}>()


// Computed property: filtered list of tasks so that when editing, the current task is not shown.
const filteredTasks = computed(() => {
  if (isEditing.value && currentTask.value) {
    return props.tasks.filter(task => task.id !== currentTask.value!.id)
  }
  return props.tasks
})


const toggleNewTaskForm = () => {
  showNewTaskForm.value = !showNewTaskForm.value
  if (showNewTaskForm.value) {
    isEditing.value = false
    currentTask.value = null
  }
}
const onSubmitTask = (task: { title: string; body: string }) => {
  emit('task-added', { ...task, board: props.board })
  showNewTaskForm.value = false
}

const triggerEdit = (task: Task)  => {
  currentTask.value = task
  isEditing.value = true
  showNewTaskForm.value = false
}
const onSubmitEdit = (task: { title: string; body: string }) => {
  if (currentTask.value) {
    const updatedTask = { ...currentTask.value, title: task.title, body: task.body }
    emit('task-edited', updatedTask)
    isEditing.value = false
    currentTask.value = null
  }
}

const triggerDelete = (task: Task) => {
  snackbarText.value = `Task "${task.title}" deleted successfully`
  snackbar.value = true
  emit('task-deleted', task.id)
}

// html drag and drop api
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const handleDrop = (event: DragEvent)  => {
  event.preventDefault()
  const taskData = event.dataTransfer?.getData('task')
  if (taskData) {
    const droppedTask = JSON.parse(taskData) as Task
    emit('task-dropped', droppedTask.id, props.board)
  }
}
</script>

<template>
  <div
    :class="`bg-${color}-200 p-4 rounded-lg shadow-lg w-full h-full`"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <h2 class="text-xl font-bold mb-2">{{ title }}</h2>

    <button
      @click="toggleNewTaskForm"
      class="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Add Task
    </button>

    <!-- new task -->
    <div v-if="showNewTaskForm" class="mb-2">
      <Form :isEdit="false" @submit-task="onSubmitTask" />
    </div>

    <!-- edit Task  -->
    <div v-if="isEditing && currentTask" class="mb-2">
      <Form 
        :id="currentTask.id"
        :isEdit="true" 
        :title="currentTask.title" 
        :body="currentTask.body" 
        @submit-edit="onSubmitEdit" 
      />
    </div>

    <ul>
      <li 
        v-for="task in filteredTasks" 
        :key="task.id" 
        draggable="true"
        @dragstart="(e) => {
          e.dataTransfer?.setData('task', JSON.stringify(task))
        }"
        class="border p-2 mb-2 rounded bg-white"
      >
        <div class="flex justify-between items-center">
          <div>
            <h4 class="font-semibold">{{ task.title }}</h4>
            <p class="text-sm">{{ task.body }}</p>
          </div>
          <div>

            <button 
              @click="triggerEdit(task)" 
              class="ml-2 px-2 py-1 bg-gray-300 rounded"
            >
              Edit
            </button>
            <button 
              @click="triggerDelete(task)" 
              class="ml-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- toast -->
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

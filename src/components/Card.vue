<script setup lang="ts">
import Form from "@/components/Form.vue";
import { defineProps, defineEmits, ref } from "vue";


type Task = {
    id: string;   
  title: string;
  body: string;
};

// Props
defineProps<{ tasks: Task[]; newTask: boolean, isEdit:boolean }>();

const currentTask = ref<Task | null>(null);  

const emit = defineEmits<{
  (event: 'submit-task', data: { title: string; body: string }): void;
  (event: 'click-task', task: Task): void;
//   (event: "submit-edit", task: Task): void;
}>();


const addTask = (payload: { title: string; body: string }) => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: payload.title,
    body: payload.body
  }

  emit("submit-task", newTask); 
}
const drag = (task: Task, event: DragEvent) => {
  event.dataTransfer?.setData("task", JSON.stringify(task));
}

const editTask = (task: Task) => {
    currentTask.value = task;  

    emit("click-task", task); 
}

</script>

<template>
  <div v-if="newTask">
    <Form :isEdit="isEdit" @submit-task="addTask" />
  </div>
  <div v-if="isEdit && currentTask">
    <Form  :title="currentTask.title" :body="currentTask.body" :isEdit="isEdit" @submit-task="addTask" />
  </div>


  <ul v-else>
    <li v-for="task in tasks" :key="task.id">
        <v-card
          draggable="true"
          @dragstart="drag(task, $event)"
          class="mx-auto my-4 border rounded-lg"
          max-width="344"
          :subtitle="task.body"
          :title="task.title"
          link
          > 
          <v-btn @click="() => editTask(task)" density="compact" icon="$vuetify"></v-btn>
        </v-card>
          
        </li>
  </ul>
</template>

<style scoped></style>

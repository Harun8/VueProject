<!-- Form.vue -->
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
// import type { Task } from '@/components/KanbanBoard.vue'

const props = defineProps<{ 
  id?: string,
  isEdit: boolean, 
  title?: string, 
  body?: string 
}>()

const emit = defineEmits<{
  (event: 'submit-task', data: { title: string; body: string }): void;
  (event: 'submit-edit', data: { id: string; title: string; body: string }): void;
}>()

const formTitle = ref(props.title || '')
const formBody = ref(props.body || '')

// som useEffect i react
watch(() => props.title, newTitle => {
  formTitle.value = newTitle || ''
})
watch(() => props.body, newBody => {
  formBody.value = newBody || ''
})

const handleSubmit =() => {
  if (!formTitle.value || !formBody.value) {
    alert('Please fill in all fields.')
    return
  }
  if (props.isEdit) {
   
    const id = props.id
    if (!id) {
      console.error('No id provided for editing.')
      return
    }
    emit('submit-edit', { id, title: formTitle.value, body: formBody.value })
  } else {
    emit('submit-task', { title: formTitle.value, body: formBody.value })
  }

  formTitle.value = ''
  formBody.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <input v-model="formTitle" placeholder="Title" class="border p-1" />
    <input v-model="formBody" placeholder="Body" class="border p-1" />
    <button @click="handleSubmit" class="px-2 py-1 bg-green-500 text-white rounded">
      Save
    </button>
  </div>
</template>

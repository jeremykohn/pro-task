<template>
  <div class="p-3 rounded-md shadow-sm flex items-start gap-3 bg-white dark:bg-slate-800">
    <input type="checkbox" :checked="task.isCompleted" @change="$emit('toggle', task.id)" class="mt-1" />
    <div class="flex-1">
      <div class="flex items-center justify-between gap-2">
        <h3 :class="['font-medium', task.isCompleted ? 'line-through text-slate-500' : '']">{{ task.title }}</h3>
        <span :class="priorityClass" class="text-xs font-semibold px-2 py-1 rounded">{{ task.priority }}</span>
      </div>
      <p v-if="showDescription && task.description" class="text-sm text-slate-600 dark:text-slate-300 mt-1">{{ task.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { Task } from '~/shared/types/task'

const props = defineProps<{ task: Task; showDescription?: boolean }>()

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
})
</script>

<style scoped>
</style>

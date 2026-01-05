<template>
  <div class="min-h-screen p-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    <div class="max-w-3xl mx-auto">
      <header class="flex items-center gap-4 mb-6">
        <h1 class="text-2xl font-bold">ProTask</h1>
        <div class="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <section class="mb-4">
        <form @submit.prevent="create">
          <div class="flex gap-2">
            <input v-model="title" placeholder="New task title" class="flex-1 px-3 py-2 border rounded" />
            <select v-model="priority" class="px-2 py-2 border rounded">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button class="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
          <textarea v-model="description" placeholder="Optional description" class="w-full mt-2 px-3 py-2 border rounded" />
        </form>
      </section>

      <section class="mb-6">
        <SearchBar />
      </section>

      <section>
        <TaskList>
          <template #controls>
            <div class="text-sm text-slate-500">{{ store.items.length }} tasks</div>
          </template>
        </TaskList>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTasks } from '~/stores/tasks'
import TaskList from '~/app/components/organisms/TaskList.vue'
import SearchBar from '~/app/components/organisms/SearchBar.vue'
import ThemeToggle from '~/app/components/organisms/ThemeToggle.vue'

const store = useTasks()

const title = ref('')
const description = ref('')
const priority = ref<'low'|'medium'|'high'>('low')

onMounted(() => {
  store.load()
})

function create() {
  if (!title.value.trim()) return
  store.addTask({ title: title.value.trim(), description: description.value.trim(), priority: priority.value })
  title.value = ''
  description.value = ''
}
</script>

<style scoped></style>

<template>
  <div class="w-full">
    <input
      v-model="q"
      @input="onInput"
      type="search"
      placeholder="Search tasks..."
      class="w-full px-3 py-2 border rounded outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTasks } from '~/stores/tasks'

const q = ref('')
const store = useTasks()

let timer: ReturnType<typeof setTimeout> | null = null
function onInput() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    store.setQuery(q.value)
  }, 250)
}

watch(
  () => store.query,
  (v) => {
    if (v === '') q.value = ''
  }
)
</script>

<style scoped></style>

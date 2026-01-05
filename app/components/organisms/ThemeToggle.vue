<template>
  <button @click="toggle" class="px-2 py-1 border rounded">
    {{ modeLabel }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const mode = ref<'light'|'dark'>('light')
const STORAGE = 'protask:theme'

onMounted(() => {
  const saved = localStorage.getItem(STORAGE)
  if (saved === 'dark') {
    mode.value = 'dark'
    document.documentElement.classList.add('dark')
  } else if (saved === 'light') {
    mode.value = 'light'
    document.documentElement.classList.remove('dark')
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    mode.value = prefersDark ? 'dark' : 'light'
    if (prefersDark) document.documentElement.classList.add('dark')
  }
})

function toggle() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem(STORAGE, mode.value)
  document.documentElement.classList.toggle('dark', mode.value === 'dark')
}

const modeLabel = computed(() => (mode.value === 'dark' ? 'Dark' : 'Light'))
</script>

<style scoped></style>

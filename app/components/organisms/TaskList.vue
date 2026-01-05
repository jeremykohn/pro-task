<template>
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <button @click="setFilter('all')" :class="filterBtn('all')">All</button>
      <button @click="setFilter('pending')" :class="filterBtn('pending')">Pending</button>
      <button @click="setFilter('completed')" :class="filterBtn('completed')">Completed</button>
      <div class="ml-auto">
        <slot name="controls"></slot>
      </div>
    </div>

    <transition-group name="list" tag="div" class="grid gap-2">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" @toggle="toggle" :showDescription="false" />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TaskCard from '~/app/components/molecules/TaskCard.vue'
import { useTasks } from '~/stores/tasks'

const store = useTasks()

const tasks = computed(() => store.list)

function toggle(id: string) {
  store.toggleComplete(id)
}

function setFilter(f: 'all' | 'pending' | 'completed') {
  store.setFilter(f)
}

function filterBtn(f: 'all' | 'pending' | 'completed') {
  return store.filter === f ? 'px-2 py-1 bg-slate-200 rounded' : 'px-2 py-1'
}
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all .2s }
.list-enter-from { opacity: 0; transform: translateY(-6px) }
.list-enter-to { opacity: 1; transform: translateY(0) }
</style>

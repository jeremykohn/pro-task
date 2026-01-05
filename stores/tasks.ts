import { defineStore } from 'pinia'
import type { Task } from '~/shared/types/task'

function nowISO() {
  return new Date().toISOString()
}

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // browser or modern node
    // @ts-ignore
    return crypto.randomUUID()
  }
  // fallback simple id
  return 'id-' + Math.random().toString(36).slice(2, 9)
}

const STORAGE_KEY = 'protask:tasks:v1'

export const useTasks = defineStore('tasks', {
  state: () => ({
    items: [] as Task[],
    filter: 'all' as 'all' | 'pending' | 'completed',
    query: '' as string,
    selectedId: '' as string | null,
  }),
  getters: {
    list: (state) => {
      let out = state.items.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      if (state.filter === 'pending') out = out.filter((t) => !t.isCompleted)
      if (state.filter === 'completed') out = out.filter((t) => t.isCompleted)
      if (state.query && state.query.trim().length > 0) {
        const q = state.query.trim().toLowerCase()
        out = out.filter((t) => {
          return (
            t.title.toLowerCase().includes(q) ||
            (t.description || '').toLowerCase().includes(q)
          )
        })
      }
      return out
    },
    selected: (state) => state.items.find((t) => t.id === state.selectedId) || null,
  },
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const items = JSON.parse(raw) as Task[]
        this.items = items
      } catch (e) {
        // ignore
      }
    },
    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      } catch (e) {
        // ignore
      }
    },
    addTask(payload: { title: string; description?: string; priority?: Task['priority'] }) {
      const id = makeId()
      const now = nowISO()
      const task: Task = {
        id,
        title: payload.title,
        description: payload.description || '',
        priority: payload.priority || 'low',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
      }
      this.items.unshift(task)
      this.save()
      return task
    },
    updateTask(id: string, patch: Partial<Task>) {
      const idx = this.items.findIndex((t) => t.id === id)
      if (idx === -1) return null
      const current = this.items[idx]
      const updated: Task = { ...current, ...patch, updatedAt: nowISO() }
      this.items.splice(idx, 1, updated)
      this.save()
      return updated
    },
    toggleComplete(id: string) {
      const idx = this.items.findIndex((t) => t.id === id)
      if (idx === -1) return
      this.items[idx].isCompleted = !this.items[idx].isCompleted
      this.items[idx].updatedAt = nowISO()
      this.save()
    },
    removeTask(id: string) {
      this.items = this.items.filter((t) => t.id !== id)
      this.save()
    },
    setFilter(f: 'all' | 'pending' | 'completed') {
      this.filter = f
    },
    setQuery(q: string) {
      this.query = q
    },
    select(id: string | null) {
      this.selectedId = id || null
    },
  },
})

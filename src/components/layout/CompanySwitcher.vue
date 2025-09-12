<template>
  <div class="relative inline-block text-left">
    <button @click="toggle" :aria-expanded="open ? 'true' : 'false'" :aria-controls="menuId" class="inline-flex items-center gap-3 rounded-lg bg-white/70 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500">
      <svg class="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7h18M6 7v13h12V7M9 7V4h6v3"/></svg>
      <span class="truncate max-w-[160px]">{{ selected?.name || 'Välj bolag' }}</span>
      <svg class="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.21l3.71-3.98a.75.75 0 1 1 1.08 1.04l-4.25 4.56a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" clip-rule="evenodd"/></svg>
    </button>

    <div v-if="open" :id="menuId" class="absolute left-0 mt-2 w-72 rounded-lg bg-white p-2 text-sm shadow-card ring-1 ring-slate-200">
      <input v-model="query" placeholder="Sök bolag..." class="w-full rounded-md border border-slate-100 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
      <ul class="mt-2 max-h-48 overflow-auto">
        <li v-for="c in filtered" :key="c.id">
          <button @click="select(c)" class="w-full text-left px-2 py-2 rounded-md hover:bg-slate-50">{{ c.name }}</button>
        </li>
        <li v-if="filtered.length===0" class="px-2 py-2 text-slate-500">Inga matchningar</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ companies: { id: string; name: string }[]; modelValue: { id: string; name: string } | null }>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: { id: string; name: string } | null): void
}>()

const open = ref(false)
const query = ref('')
const menuId = 'company-menu'

const selected = computed(() => props.modelValue)

function toggle() { open.value = !open.value }
function close() { open.value = false }
function select(c: { id: string; name: string }) { emit('update:modelValue', c); close() }

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.companies || []
  return (props.companies || []).filter(c => c.name.toLowerCase().includes(q))
})

let onDocClick: ((e: MouseEvent) => void) | null = null
onMounted(() => {
  onDocClick = (e: MouseEvent) => {
    const target = e.target as Node
    const root = (document.querySelector('#app') as HTMLElement)
    // close when clicking outside component
    const menu = document.getElementById(menuId)
    if (!menu) return
    if (!menu.contains(target) && !(target as HTMLElement).closest('[aria-controls="'+menuId+'"]')) {
      close()
    }
  }
  document.addEventListener('click', onDocClick)
})
onBeforeUnmount(() => { if (onDocClick) document.removeEventListener('click', onDocClick) })
</script>

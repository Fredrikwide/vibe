<template>
  <!-- Overlay for mobile -->
  <div
    v-if="open"
    class="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
    aria-hidden="true"
    @click="$emit('close')"
  />

  <aside
    class="fixed inset-y-0 left-0 z-50 w-72 transform bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-card ring-1 ring-slate-200 transition-transform duration-200 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    aria-label="Main"
  >
    <div class="flex h-16 items-center gap-2 px-4 border-b border-slate-200/60">
      <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold">A</div>
      <span class="text-lg font-semibold text-slate-800">Akribi</span>
      <button
        class="ml-auto lg:hidden rounded-md p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
        @click="$emit('close')"
        aria-label="Close sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 1 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>
      </button>
    </div>

    <nav class="px-3 py-4">
      <ul class="space-y-1">
        <li v-for="item in items" :key="item.label">
          <a
            href="#"
            class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            :aria-current="item.current ? 'page' : undefined"
          >
            <span class="grid h-9 w-9 place-items-center rounded-md bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700">
              <component :is="item.icon" class="h-5 w-5" />
            </span>
            <span class="truncate">{{ item.label }}</span>
            <span v-if="item.badge" class="ml-auto badge bg-brand-50 text-brand-700 ring-brand-200">{{ item.badge }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="mt-auto px-4 py-4 text-xs text-slate-500">
      <div class="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
        <p class="font-medium text-slate-700">Lagring</p>
        <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div class="h-full bg-brand-500" style="width: 42%"></div>
        </div>
        <p class="mt-2">4,2 GB av 10 GB</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { h, defineComponent } from 'vue'

const props = defineProps<{ open: boolean }>()

type Item = { label: string; icon: any; current?: boolean; badge?: string }

const Icon = (path: string) =>
  defineComponent({
    render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor', class: 'h-5 w-5' }, [h('path', { d: path })]),
  })

const items: Item[] = [
  { label: 'Översikt', icon: Icon('M3 12l9-9 9 9-1.5 1.5L12 5.25 4.5 13.5 3 12zm1.5 3L12 7.5l7.5 7.5V21H4.5v-6z') , current: true },
  { label: 'Fakturor', icon: Icon('M6 2.25h7.5a3 3 0 0 1 3 3V21l-4.5-2.25L7.5 21V5.25a3 3 0 0 1 3-3zM9 9h6M9 12h6M9 15h6') , badge: '12' },
  { label: 'Kunder', icon: Icon('M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 1.5c-4.14 0-7.5 2.1-7.5 4.69V21h15v-2.81c0-2.59-3.36-4.69-7.5-4.69z') },
  { label: 'Betalningar', icon: Icon('M3 7.5h18v9H3v-9zm1.5 1.5v6h15v-6h-15zM6 12h4.5') },
  { label: 'Rapporter', icon: Icon('M4.5 3.75h15v16.5h-15V3.75zM9 15h3v3H9v-3zm0-6h3v4.5H9V9zM13.5 9H18v9h-4.5V9z') },
  { label: 'Inställningar', icon: Icon('M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zM3.75 12A8.25 8.25 0 1 1 12 20.25 8.25 8.25 0 0 1 3.75 12z') },
]
</script>

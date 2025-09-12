<template>
  <header class="sticky top-0 z-30 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 ring-1 ring-slate-200">
    <div class="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
      <button
        class="-ml-2 inline-flex items-center rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:hidden"
        @click="$emit('toggleSidebar')"
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M3.75 6.75h16.5v1.5H3.75v-1.5zm0 4.5h16.5v1.5H3.75v-1.5zm0 4.5h16.5v1.5H3.75v-1.5z"/></svg>
      </button>

      <div class="ml-auto flex items-center gap-3">
        <div class="hidden md:block">
          <CompanySwitcher :companies="companies" :modelValue="selectedCompany" @update:modelValue="updateSelectedCompany" />
        </div>

        <button class="hidden sm:inline-flex btn-secondary">Hjälp</button>

        <div class="relative" ref="wrapper" @keyup.esc="open = false">
          <button
            class="flex items-center gap-3 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-brand-500"
            :aria-expanded="open ? 'true' : 'false'"
            aria-haspopup="menu"
            @click="toggle()"
          >
            <img :src="avatarUrl" alt="Profile picture" class="h-9 w-9 rounded-full ring-1 ring-slate-200 object-cover" />
            <span class="hidden text-sm font-medium text-slate-700 sm:block">{{ userName }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-slate-500"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.21l3.71-3.98a.75.75 0 1 1 1.08 1.04l-4.25 4.56a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" clip-rule="evenodd"/></svg>
          </button>

          <div
            v-if="open"
            class="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white p-1.5 text-sm shadow-card ring-1 ring-slate-200 focus:outline-none"
            role="menu"
            aria-label="Profile"
          >
            <a href="#" class="flex items-center gap-3 rounded-md px-2.5 py-2 hover:bg-slate-50" role="menuitem">
              <span class="h-8 w-8 rounded-full bg-slate-100 grid place-items-center text-slate-600">👤</span>
              <div>
                <p class="font-medium text-slate-900">{{ userName }}</p>
                <p class="text-slate-500">Visa profil</p>
              </div>
            </a>
            <hr class="my-1 border-slate-200" />
            <a href="#" class="block rounded-md px-2.5 py-2 hover:bg-slate-50" role="menuitem">Inställningar</a>
            <a href="#" class="block rounded-md px-2.5 py-2 hover:bg-slate-50" role="menuitem">Fakturering</a>
            <a href="#" class="block rounded-md px-2.5 py-2 hover:bg-slate-50" role="menuitem">Logga ut</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import CompanySwitcher from './CompanySwitcher.vue'

const props = defineProps<{ userName: string; companies?: { id: string; name: string }[]; selectedCompany?: { id: string; name: string } | null }>()
const emit = defineEmits<{
  (e: 'update:selectedCompany', val: { id: string; name: string } | null): void
}>()

const open = ref(false)
const wrapper = ref<HTMLElement | null>(null)

function toggle() { open.value = !open.value }

let onDocClick: ((e: MouseEvent) => void) | null = null
onMounted(() => {
  onDocClick = (e: MouseEvent) => {
    if (!open.value) return
    const target = e.target as Node
    const el = wrapper.value
    if (el && !el.contains(target)) open.value = false
  }
  document.addEventListener('click', onDocClick)
})

onBeforeUnmount(() => {
  if (onDocClick) document.removeEventListener('click', onDocClick)
})

const avatarUrl = computed(() => {
  const initials = props.userName.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()
  const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#2b86ff'/>
        <stop offset='100%' stop-color='#22c3a6'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' rx='999' fill='url(#g)'/>
    <text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' font-size='34' font-family='Inter, Arial, sans-serif' fill='white' font-weight='700'>${initials}</text>
  </svg>`)
  return `data:image/svg+xml;utf8,${svg}`
})

// propagate company selection changes from CompanySwitcher
function updateSelectedCompany(val: { id: string; name: string } | null) {
  emit('update:selectedCompany', val)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
    <div class="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
    <div class="flex">
      <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />
      <div class="lg:pl-72 flex-1">
        <Topbar :user-name="userName" :companies="companies" v-model:selectedCompany="selectedCompany" @toggleSidebar="sidebarOpen = true" />
        <main id="main" class="px-4 sm:px-6 lg:px-8 py-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'

const props = defineProps<{ userName: string; companies?: { id: string; name: string }[] }>()
const sidebarOpen = ref(false)
const userName = props.userName
const companies = props.companies || []
const selectedCompany = ref<{ id: string; name: string } | null>(companies[0] || null)
</script>

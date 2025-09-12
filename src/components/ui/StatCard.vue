<template>
  <div class="card p-4 sm:p-5">
    <div class="flex items-center justify-between">
      <p class="text-sm font-medium text-slate-600">{{ label }}</p>
      <slot name="icon" />
    </div>
    <p class="mt-2 text-2xl font-semibold text-slate-900">{{ value }}</p>
    <p class="mt-1 text-sm" :class="positive ? 'text-emerald-600' : 'text-rose-600'">{{ change }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props { label: string; value: string | number; change?: string; positive?: boolean }
withDefaults(defineProps<Props>(), { change: '', positive: true })
</script>

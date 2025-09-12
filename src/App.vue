<script setup lang="ts">
import AppShell from './components/layout/AppShell.vue'
import StatCard from './components/ui/StatCard.vue'

const userName = 'Fredrik Widegren'

const companies = [
  { id: 'kb1', name: 'Kommunfastigheter AB' },
  { id: 'mhb', name: 'Malmö Bostäder AB' },
  { id: 'kb2', name: 'Stockholm Bostadshus AB' },
]

const stats = [
  { label: 'Utestående', value: '12 480 kr', change: '+8,2% den här månaden', positive: true },
  { label: 'Betalt denna månad', value: '24 350 kr', change: '+3,4% vs föregående', positive: true },
  { label: 'Förfallen', value: '1 120 kr', change: '-12% den här veckan', positive: false },
  { label: 'Utkast', value: '7', change: '', positive: true },
]

interface Invoice { id: string; client: string; amount: string; due: string; status: 'Betald'|'Förfallen'|'Utkast'|'Skickad' }
const invoices: Invoice[] = [
  { id: 'INV-2048', client: 'Nordic Retail AB', amount: '3 200 kr', due: '2025-09-05', status: 'Skickad' },
  { id: 'INV-2047', client: 'Skoglund Consulting', amount: '1 120 kr', due: '2025-08-29', status: 'Förfallen' },
  { id: 'INV-2046', client: 'Asterix Media', amount: '540 kr', due: '2025-09-15', status: 'Utkast' },
  { id: 'INV-2045', client: 'Svea Logistics', amount: '7 800 kr', due: '2025-08-20', status: 'Betald' },
]

function statusClass(s: Invoice['status']) {
  return s === 'Betald' ? 'badge badge-paid' : s === 'Förfallen' ? 'badge badge-overdue' : s === 'Utkast' ? 'badge badge-draft' : 'badge badge-sent'
}
</script>

<template>
  <AppShell :user-name="userName" :companies="companies">
    <section aria-labelledby="page-title" class="space-y-6">
      <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 id="page-title" class="text-2xl font-semibold tracking-tight text-slate-900">Välkommen tillbaka, {{ userName.split(' ')[0] }}</h1>
          <p class="mt-1 text-slate-600">Hantera fakturor, bostadsbolag och betalningar för kommunala bostadsbolag.</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Lägg till kund
          </button>
          <button class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75zm3 9.75h6m-6-3h6m-6 6h3"/></svg>
            Ny faktura
          </button>
        </div>
      </header>

      <section aria-label="Key metrics" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard v-for="s in stats" :key="s.label" v-bind="s">
          <template #icon>
            <span class="h-9 w-9 grid place-items-center rounded-md bg-brand-50 text-brand-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M3.75 18.75h16.5v1.5H3.75v-1.5zM6 3.75h3v12H6v-12zm4.5 3h3v9h-3v-9zM15 9.75h3v6h-3v-6z"/></svg>
            </span>
          </template>
        </StatCard>
      </section>

      <section class="grid gap-4 lg:grid-cols-3">
        <div class="card p-4 sm:p-5 lg:col-span-2">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold text-slate-900">Senaste fakturorna</h2>
            <button class="btn-secondary">Exportera CSV</button>
          </div>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="text-left text-slate-600">
                <tr class="border-b border-slate-200">
                  <th class="py-2 pr-4 font-medium">Faktura</th>
                  <th class="py-2 pr-4 font-medium">Kund</th>
                  <th class="py-2 pr-4 font-medium">Förfallodatum</th>
                  <th class="py-2 pr-4 font-medium">Belopp</th>
                  <th class="py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr v-for="inv in invoices" :key="inv.id" class="hover:bg-slate-50">
                  <td class="py-2 pr-4 font-medium text-slate-900">{{ inv.id }}</td>
                  <td class="py-2 pr-4 text-slate-700">{{ inv.client }}</td>
                  <td class="py-2 pr-4 text-slate-700">{{ inv.due }}</td>
                  <td class="py-2 pr-4 text-slate-900">{{ inv.amount }}</td>
                  <td class="py-2 text-right">
                    <span :class="statusClass(inv.status)">{{ inv.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card p-4 sm:p-5">
          <h2 class="text-base font-semibold text-slate-900">Snabbåtgärder</h2>
          <div class="mt-3 grid gap-2">
            <button class="btn-primary justify-between">
              Skapa faktura
              <span class="rounded-md bg-white/20 px-2 py-0.5 text-xs">⌘N</span>
            </button>
            <button class="btn-secondary justify-between">
              Registrera betalning
              <span class="rounded-md bg-slate-900/5 px-2 py-0.5 text-xs">⌘R</span>
            </button>
            <button class="btn-secondary justify-between">
              Lägg till kostnad
              <span class="rounded-md bg-slate-900/5 px-2 py-0.5 text-xs">⌘E</span>
            </button>
          </div>

          <div class="mt-6 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
            <p class="text-sm font-medium">Akribi Tips</p>
            <p class="mt-1 text-sm/6 opacity-90">Skicka automatiska påminnelser för att minska antal förfallna fakturor med upp till 30%.</p>
            <button class="mt-3 inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 text-sm font-medium hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/60">
              Aktivera påminnelser
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M3.5 10a6.5 6.5 0 1 1 11.14 4.28l1.54 1.54a.75.75 0 1 1-1.06 1.06l-1.54-1.54A6.5 6.5 0 0 1 3.5 10zm6.5-3.25a.75.75 0 0 0-1.5 0v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 0-1.5H10V6.75z" clip-rule="evenodd"/></svg>
            </button>
          </div>
        </div>
      </section>
    </section>
  </AppShell>
</template>

<style scoped></style>

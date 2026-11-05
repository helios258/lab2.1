<script setup lang="ts">
import { POTIONS } from '../constants'
import { alchemist, currentCustomer, handleCustomer } from '../useAlchemistStore'

const getPotionName = (id: string) => POTIONS.find(p => p.id === id)?.name || id
</script>

<template>
  <div class="card">
    <h2>Черга Покупців</h2>
    <p class="status-msg">{{ currentCustomer.message }}</p>

    <div v-if="currentCustomer.customer && alchemist.isAlive" class="customer-card">
      <div>Покупець: <strong>{{ currentCustomer.customer.name }}</strong></div>
      <div>Потреба: <strong>{{ getPotionName(currentCustomer.customer.wantedPotionId) }}</strong></div>
      <div>Ціна: <strong class="gold">{{ currentCustomer.customer.offeredPrice }} 🪙</strong></div>

      <div class="btn-group">
        <button class="btn-sell" @click="handleCustomer('sell')">Продати</button>
        <button class="btn-refuse" @click="handleCustomer('refuse')">Відмовити</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.status-msg { font-style: italic; color: #64748b; margin-bottom: 1rem; }
.customer-card { background: #f1f5f9; padding: 1rem; border-radius: 8px; display: flex; flex-direction: column; gap: 0.5rem; }
.gold { color: #d97706; }
.btn-group { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.btn-sell { flex: 1; background: #10b981; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-refuse { flex: 1; background: #ef4444; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>
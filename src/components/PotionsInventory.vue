<script setup lang="ts">
import { POTIONS } from '../constants'
import { alchemist, inventory, drinkPotion } from '../useAlchemistStore'
</script>

<template>
  <div class="card">
    <h2>Вітрина Зілля</h2>
    <div class="potions-list">
      <div v-for="pot in POTIONS" :key="pot.id" class="potion-item">
        <div>
          <strong>{{ pot.name }}</strong>
          <div class="qty">На складі: {{ inventory.potions[pot.id] || 0 }}</div>
        </div>
        <button 
          :disabled="!alchemist.isAlive || (inventory.potions[pot.id] || 0) <= 0" 
          @click="drinkPotion(pot.id)"
        >
          Випити
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.potions-list { display: flex; flex-direction: column; gap: 0.75rem; }
.potion-item { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem; background: #f8fafc; border-radius: 6px; }
.qty { font-size: 0.85rem; color: #64748b; }
button { background: #3b82f6; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
button:disabled { background: #cbd5e1; cursor: not-allowed; }
</style>
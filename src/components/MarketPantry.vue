<script setup lang="ts">
import { INGREDIENTS } from '../constants'
import { alchemist, inventory, buyIngredient, addToCauldron } from '../useAlchemistStore'
</script>

<template>
  <div class="card">
    <h2>Ринок та Комора</h2>
    
    <h4>Ринок сировини</h4>
    <div class="list">
      <div v-for="ing in INGREDIENTS" :key="ing.id" class="row">
        <span>{{ ing.name }} ({{ ing.price }} 🪙)</span>
        <button :disabled="!alchemist.isAlive || alchemist.gold < ing.price" @click="buyIngredient(ing.id)">
          Купити
        </button>
      </div>
    </div>

    <h4>Запаси в коморі</h4>
    <div class="grid">
      <div 
        v-for="ing in INGREDIENTS" 
        :key="'pantry-' + ing.id" 
        class="pantry-card"
        :class="{ active: (inventory.ingredients[ing.id] || 0) > 0 && alchemist.isAlive }"
        @click="(inventory.ingredients[ing.id] || 0) > 0 && alchemist.isAlive && addToCauldron(ing.id)"
      >
        <span>{{ ing.name }}</span>
        <span class="count">{{ inventory.ingredients[ing.id] || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.row { display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 0.5rem; border-radius: 6px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.pantry-card { display: flex; justify-content: space-between; padding: 0.6rem; background: #f1f5f9; border-radius: 6px; border: 1px solid #e2e8f0; }
.pantry-card.active { cursor: pointer; border-color: #6366f1; background: #eef2ff; }
.count { font-weight: bold; color: #4f46e5; }
button { background: #4f46e5; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
button:disabled { background: #cbd5e1; cursor: not-allowed; }
</style>
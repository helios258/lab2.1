<script setup lang="ts">
import { RECIPES, INGREDIENTS, POTIONS } from '../constants'
import { inventory } from '../useAlchemistStore'

const getIngName = (id: string) => INGREDIENTS.find(i => i.id === id)?.name || id
const getPotName = (id: string) => POTIONS.find(p => p.id === id)?.name || id
</script>

<template>
  <div class="card">
    <h2>Гримуар Рецептів</h2>
    <div class="list">
      <div v-for="(r, idx) in RECIPES" :key="idx" class="recipe-item">
        <template v-if="inventory.unlockedRecipes.includes(r.resultPotionId)">
          <span>{{ getIngName(r.ingredient1) }} + {{ getIngName(r.ingredient2) }}</span>
          <strong>➔ {{ getPotName(r.resultPotionId) }}</strong>
        </template>
        <template v-else>
          <span class="locked">??? + ???</span>
          <strong class="locked">➔ 🔒 Невідомо</strong>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.list { display: flex; flex-direction: column; gap: 0.5rem; }
.recipe-item { display: flex; justify-content: space-between; padding: 0.5rem; background: #f8fafc; border-radius: 6px; }
.locked { color: #94a3b8; }
</style>
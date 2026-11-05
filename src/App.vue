<script setup lang="ts">
import AlchemistPanel from './components/AlchemistPanel.vue'
import MarketPantry from './components/MarketPantry.vue'
import AlchemyCauldron from './components/AlchemyCauldron.vue'
import PotionsInventory from './components/PotionsInventory.vue'
import CustomerQueue from './components/CustomerQueue.vue'
import RecipeBook from './components/RecipeBook.vue'
</script>

<template>
  <div class="app-layout">
    <h1>✨ Алхімічна лавка: Синтез зілля</h1>
    
    <div class="grid">
      <div class="col">
        <AlchemistPanel />
        <MarketPantry />
      </div>
      <div class="col">
        <AlchemyCauldron />
        <CustomerQueue />
      </div>
      <div class="col">
        <PotionsInventory />
        <RecipeBook />
      </div>
    </div>
  </div>
</template>

<style>

.col > * div, 
.col > * section, 
.col > * article,
.col > * li {
  background: transparent !important;
  color: #f8fafc !important;
}

.col > * button {
  background: #3b82f6 !important;
  color: #ffffff !important;
}

body { 
  font-family: 'Inter', sans-serif; 
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('./assets/bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0; 
  padding: 2rem 1rem; 
  color: #ffffff !important; 
}

.app-layout {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #66ff00;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: transparent !important;
}

.col > * {
  background: rgba(15, 17, 23, 0.85) !important;
  backdrop-filter: blur(16px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(207, 187, 187, 0.2) !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6) !important;
  padding: 20px;
}

.col > * *:not(button):not(input) {
  color: #a2dd90 !important;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
<script setup lang="ts">
import { INGREDIENTS } from '../constants'
import { alchemist, cauldron, removeFromCauldron, synthesize } from '../useAlchemistStore'

const getIngName = (id: string | null) => INGREDIENTS.find(i => i.id === id)?.name || 'Порожньо'
</script>

<template>
  <div class="card">
    <h2>Котел Синтезу</h2>
    <div class="slots">
      <div class="slot" @click="cauldron.slot1 && alchemist.isAlive && removeFromCauldron('slot1')">
        <span>Слот 1</span>
        <strong>{{ getIngName(cauldron.slot1) }}</strong>
      </div>
      <div class="slot" @click="cauldron.slot2 && alchemist.isAlive && removeFromCauldron('slot2')">
        <span>Слот 2</span>
        <strong>{{ getIngName(cauldron.slot2) }}</strong>
      </div>
    </div>

    <button 
      class="synth-btn" 
      :disabled="!alchemist.isAlive || !cauldron.slot1 || !cauldron.slot2" 
      @click="synthesize"
    >
      Синтезувати (-15 MP)
    </button>

    <div v-if="cauldron.lastResult" class="result" :class="{ success: cauldron.lastResult.success, fail: !cauldron.lastResult.success }">
      {{ cauldron.lastResult.message }}
    </div>
  </div>
</template>

<style scoped>
.card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.slots { display: flex; gap: 1rem; margin-bottom: 1rem; }
.slot { flex: 1; padding: 1rem; border: 2px dashed #cbd5e1; border-radius: 8px; text-align: center; cursor: pointer; display: flex; flex-direction: column; }
.slot:hover { border-color: #6366f1; background: #f8fafc; }
.synth-btn { width: 100%; background: #10b981; color: white; border: none; padding: 0.8rem; border-radius: 8px; font-weight: bold; cursor: pointer; }
.synth-btn:disabled { background: #cbd5e1; cursor: not-allowed; }
.result { margin-top: 1rem; padding: 0.75rem; border-radius: 6px; text-align: center; font-weight: bold; }
.result.success { background: #d1fae5; color: #065f46; }
.result.fail { background: #fee2e2; color: #991b1b; }
</style>
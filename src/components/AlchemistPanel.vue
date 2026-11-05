<script setup lang="ts">
import { alchemist, applyLevelUpChoice, resurrectAlchemist } from '../useAlchemistStore'
</script>

<template>
  <div class="card">
    <h2>Алхімік</h2>
    <div class="stats">
      <div>Рівень: <strong>{{ alchemist.level }}</strong> <span v-if="alchemist.masterRankCount > 0">(Ранг майстра: {{ alchemist.masterRankCount }})</span></div>
      <div>Гаманець: <strong class="gold">{{ alchemist.gold }} 🪙</strong></div>
      
      <div class="bar-group">
        <label>HP: {{ alchemist.hp }} / {{ alchemist.maxHp }}</label>
        <progress :value="alchemist.hp" :max="alchemist.maxHp" class="hp"></progress>
      </div>
      
      <div class="bar-group">
        <label>MP: {{ alchemist.mp }} / {{ alchemist.maxMp }}</label>
        <progress :value="alchemist.mp" :max="alchemist.maxMp" class="mp"></progress>
      </div>

      <div class="bar-group">
        <label>XP: {{ alchemist.xp }} / {{ alchemist.xpToNextLevel }}</label>
        <progress :value="alchemist.xp" :max="alchemist.xpToNextLevel" class="xp"></progress>
      </div>
    </div>

    <div v-if="alchemist.pendingLevelUp" class="levelup-box">
      <h3>Вітаємо з новим рівнем!</h3>
      <p>Оберіть характеристику для покращення (+15 одиниць з повним відновленням):</p>
      <div class="btn-group">
        <button class="btn-primary" @click="applyLevelUpChoice('hp')">+15 Max HP</button>
        <button class="btn-primary" @click="applyLevelUpChoice('mp')">+15 Max MP</button>
      </div>
    </div>

    <!-- Загибель -->
    <div v-if="!alchemist.isAlive" class="death-box">
      <h3>☠️ Алхімік загинув!</h3>
      <button class="btn-danger" @click="resurrectAlchemist">Воскресити (Скидання до 1-го рівня)</button>
    </div>
  </div>
</template>

<style scoped>
.card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.stats { display: flex; flex-direction: column; gap: 0.75rem; }
.gold { color: #d97706; }
.bar-group { display: flex; flex-direction: column; gap: 0.25rem; }
progress { width: 100%; height: 14px; border-radius: 7px; overflow: hidden; }
progress.hp::-webkit-progress-value { background-color: #ef4444; }
progress.mp::-webkit-progress-value { background-color: #3b82f6; }
progress.xp::-webkit-progress-value { background-color: #8b5cf6; }
.levelup-box { margin-top: 1rem; padding: 1rem; background: #eef2ff; border-radius: 8px; border: 1px solid #c7d2fe; }
.btn-group { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.btn-primary { background: #4f46e5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; flex: 1; }
.death-box { margin-top: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca; text-align: center; }
.btn-danger { background: #dc2626; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>
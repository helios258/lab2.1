import { reactive, watch } from 'vue'
import { AlchemistState, InventoryState, Customer } from './types'
import { INGREDIENTS, POTIONS, RECIPES, CUSTOMER_NAMES } from './constants'

const STORAGE_KEY = 'alchemy_shop_state_v2'

const defaultAlchemist: AlchemistState = {
  hp: 100,
  maxHp: 100,
  mp: 100,
  maxMp: 100,
  gold: 50,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  isAlive: true,
  masterRankCount: 0,
  pendingLevelUp: false
}

const defaultInventory: InventoryState = {
  ingredients: { red_root: 2, moon_mushroom: 1 },
  potions: {},
  unlockedRecipes: []
}

function loadSavedState() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
  }
  return { alchemist: defaultAlchemist, inventory: defaultInventory }
}

const loaded = loadSavedState()

export const alchemist = reactive<AlchemistState>(loaded.alchemist)
export const inventory = reactive<InventoryState>(loaded.inventory)

watch(
  [alchemist, inventory],
  () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ alchemist, inventory }))
  },
  { deep: true }
)

export const currentCustomer = reactive<{ customer: Customer | null; message: string }>({
  customer: null,
  message: 'Лавка відкрита.'
})

export const cauldron = reactive<{
  slot1: string | null
  slot2: string | null
  lastResult: { success: boolean; message: string; damage?: number } | null
}>({
  slot1: null,
  slot2: null,
  lastResult: null
})

export function generateCustomer() {
  if (!alchemist.isAlive) {
    currentCustomer.customer = null;
    currentCustomer.message = 'Алхімік мертвий. Лавка зачинена.';
    return;
  }
  
  const name = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)]
  const potion = POTIONS[Math.floor(Math.random() * POTIONS.length)]
  const variation = (Math.random() * 0.3) - 0.15
  const masterBonus = 1 + (alchemist.masterRankCount * 0.05)
  const offeredPrice = Math.round(potion.basePrice * (1 + variation) * masterBonus)

  currentCustomer.customer = {
    id: Math.random().toString(),
    name,
    wantedPotionId: potion.id,
    offeredPrice
  }
  currentCustomer.message = `${name} шукає ${potion.name} і пропонує ${offeredPrice} монет.`
}

if (!currentCustomer.customer && alchemist.isAlive) {
  generateCustomer()
}

export function buyIngredient(ingredientId: string) {
  if (!alchemist.isAlive) return
  const ing = INGREDIENTS.find(i => i.id === ingredientId)
  if (!ing || alchemist.gold < ing.price) return

  alchemist.gold -= ing.price
  inventory.ingredients[ingredientId] = (inventory.ingredients[ingredientId] || 0) + 1
}

export function addToCauldron(ingredientId: string) {
  if (!alchemist.isAlive) return
  if ((inventory.ingredients[ingredientId] || 0) <= 0) return

  if (!cauldron.slot1) {
    inventory.ingredients[ingredientId]--
    cauldron.slot1 = ingredientId
  } else if (!cauldron.slot2) {
    inventory.ingredients[ingredientId]--
    cauldron.slot2 = ingredientId
  }
}

export function removeFromCauldron(slot: 'slot1' | 'slot2') {
  const item = cauldron[slot]
  if (item) {
    inventory.ingredients[item] = (inventory.ingredients[item] || 0) + 1
    cauldron[slot] = null
  }
}

export function synthesize() {
  if (!alchemist.isAlive) return
  if (!cauldron.slot1 || !cauldron.slot2) return
  if (alchemist.mp < 15) {
    cauldron.lastResult = { success: false, message: 'Недостатньо мани (потрібно 15 MP)!' }
    return
  }

  alchemist.mp -= 15
  const s1 = cauldron.slot1
  const s2 = cauldron.slot2

  cauldron.slot1 = null
  cauldron.slot2 = null

  const recipe = RECIPES.find(
    r => (r.ingredient1 === s1 && r.ingredient2 === s2) || (r.ingredient1 === s2 && r.ingredient2 === s1)
  )

  if (recipe) {
    const pId = recipe.resultPotionId
    inventory.potions[pId] = (inventory.potions[pId] || 0) + 1
    if (!inventory.unlockedRecipes.includes(pId)) {
      inventory.unlockedRecipes.push(pId)
    }
    const pName = POTIONS.find(p => p.id === pId)?.name
    cauldron.lastResult = { success: true, message: `Успіх! Створено: ${pName}` }
  } else {
    const roll = Math.random()
    let damage = 25
    let desc = 'Звичайний вибух (-25 HP)'

    if (roll > 0.85) {
      damage = 75 
      desc = 'КАТАСТРОФІЧНИЙ ВИБУХ! (-75 HP)'
    } else if (roll > 0.5) {
      damage = 50 
      desc = 'Важкий вибух! (-50 HP)'
    }

    alchemist.hp = Math.max(0, alchemist.hp - damage)
    cauldron.lastResult = { success: false, message: `Невдача! ${desc}`, damage }

    if (alchemist.hp <= 0) {
      alchemist.isAlive = false
      currentCustomer.customer = null
      currentCustomer.message = 'Алхімік загинув від вибуху! Лавка зачинена.'
    }
  }
}

export function drinkPotion(potionId: string) {
  if (!alchemist.isAlive) return
  if ((inventory.potions[potionId] || 0) <= 0) return

  const pot = POTIONS.find(p => p.id === potionId)
  if (!pot) return

  inventory.potions[potionId]--

  if (pot.healHp) {
    alchemist.hp = Math.min(alchemist.maxHp, alchemist.hp + pot.healHp)
  }
  if (pot.restoreMp) {
    alchemist.mp = Math.min(alchemist.maxMp, alchemist.mp + pot.restoreMp)
  }
}

export function handleCustomer(action: 'sell' | 'refuse') {
  if (!alchemist.isAlive || !currentCustomer.customer) return

  if (action === 'sell') {
    const pId = currentCustomer.customer.wantedPotionId
    if ((inventory.potions[pId] || 0) > 0) {
      inventory.potions[pId]--
      alchemist.gold += currentCustomer.customer.offeredPrice
      addXp(40)
    } else {
      currentCustomer.message = 'Немає потрібного зілля на вітрині!'
      return
    }
  }

  generateCustomer()
}

function addXp(amount: number) {
  alchemist.xp += amount
  if (alchemist.xp >= alchemist.xpToNextLevel) {
    alchemist.xp -= alchemist.xpToNextLevel
    alchemist.level++
    alchemist.xpToNextLevel = Math.round(alchemist.xpToNextLevel * 1.3)

    if (alchemist.level % 5 === 0) {
      alchemist.masterRankCount++
      alchemist.hp = alchemist.maxHp
      alchemist.mp = alchemist.maxMp
      currentCustomer.message = `Досягнуто Рівень Майстра #${alchemist.masterRankCount}! Ціни продажу зросли.`
    } else {
      alchemist.pendingLevelUp = true
    }
  }
}

export function applyLevelUpChoice(stat: 'hp' | 'mp') {
  if (stat === 'hp') {
    alchemist.maxHp += 15
  } else {
    alchemist.maxMp += 15
  }
  alchemist.hp = alchemist.maxHp
  alchemist.mp = alchemist.maxMp
  alchemist.pendingLevelUp = false
}

export function resurrectAlchemist() {
  alchemist.isAlive = true
  alchemist.hp = 100
  alchemist.maxHp = 100
  alchemist.mp = 100
  alchemist.maxMp = 100
  alchemist.level = 1
  alchemist.xp = 0
  alchemist.xpToNextLevel = 100
  alchemist.masterRankCount = 0
  alchemist.pendingLevelUp = false
  generateCustomer()
}
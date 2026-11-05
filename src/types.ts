export interface Ingredient {
  id: string
  name: string
  price: number
}

export interface Potion {
  id: string
  name: string
  basePrice: number
  description: string
  healHp?: number
  restoreMp?: number
}

export interface Recipe {
  ingredient1: string
  ingredient2: string
  resultPotionId: string
}

export interface Customer {
  id: string
  name: string
  wantedPotionId: string
  offeredPrice: number
}

export interface AlchemistState {
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  gold: number
  level: number
  xp: number
  xpToNextLevel: number
  isAlive: boolean
  masterRankCount: number
  pendingLevelUp: boolean
}

export interface InventoryState {
  ingredients: Record<string, number>
  potions: Record<string, number>
  unlockedRecipes: string[]
}
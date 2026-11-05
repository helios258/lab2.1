import { Ingredient, Potion, Recipe } from './types'

export const INGREDIENTS: Ingredient[] = [
  { id: 'red_root', name: 'Червоний корінь', price: 5 },
  { id: 'moon_mushroom', name: 'Місячний гриб', price: 8 },
  { id: 'dragon_scale', name: 'Луска дракона', price: 15 },
  { id: 'ghost_flower', name: 'Квітка привида', price: 12 },
  { id: 'sulfur_crystal', name: 'Кристал сірки', price: 10 }
]

export const POTIONS: Potion[] = [
  { id: 'heal_potion', name: 'Зілля лікування', basePrice: 25, description: 'Відновлює 40 HP', healHp: 40 },
  { id: 'mana_potion', name: 'Зілля мани', basePrice: 20, description: 'Відновлює 40 MP', restoreMp: 40 },
  { id: 'strength_potion', name: 'Зілля сили', basePrice: 45, description: 'Потужний еліксир для боїв' },
  { id: 'elixir_wisdom', name: 'Еліксир мудрості', basePrice: 60, description: 'Рідкісна магічна виварка' }
]

export const RECIPES: Recipe[] = [
  { ingredient1: 'red_root', ingredient2: 'moon_mushroom', resultPotionId: 'heal_potion' },
  { ingredient1: 'red_root', ingredient2: 'sulfur_crystal', resultPotionId: 'mana_potion' },
  { ingredient1: 'dragon_scale', ingredient2: 'sulfur_crystal', resultPotionId: 'strength_potion' },
  { ingredient1: 'moon_mushroom', ingredient2: 'ghost_flower', resultPotionId: 'elixir_wisdom' }
]

export const CUSTOMER_NAMES = ['Лицар Брайан', 'Чарівниця Елрін', 'Торговець Ганс', 'Ельфійка Міра', 'Мандрівний Монах']
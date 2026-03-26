import { createServerFn } from '@tanstack/react-start'
import { db } from '../../../db/client'
import { ingredients, recipe_ingredients, recipe_tags, recipes, steps, tags } from '../../../db/schema'
import type { NormalizedRecipePayload } from './AddRecipes'

const _saveRecipe = createServerFn({ method: 'POST' }).handler(async (ctx) => {
  const data = ctx.data as unknown as NormalizedRecipePayload

  const [recipe] = await db.insert(recipes).values(data.recipe).returning()

  if (data.steps.length) {
    await db.insert(steps).values(
      data.steps.map((s) => ({ ...s, recipe_id: recipe.id }))
    )
  }

  for (const ing of data.ingredients) {
    const [ingredient] = await db
      .insert(ingredients)
      .values({ name: ing.name })
      .onConflictDoUpdate({ target: ingredients.name, set: { name: ing.name } })
      .returning()

    await db.insert(recipe_ingredients).values({
      recipe_id:     recipe.id,
      ingredient_id: ingredient.id,
      quantity:      ing.quantity?.toString(),
      unit:          ing.unit,
      note:          ing.note,
    })
  }

  for (const tagName of data.tagNames) {
    const [tag] = await db
      .insert(tags)
      .values({ name: tagName })
      .onConflictDoUpdate({ target: tags.name, set: { name: tagName } })
      .returning()

    await db.insert(recipe_tags).values({ recipe_id: recipe.id, tag_id: tag.id })
  }

  return recipe
})

// Typed wrapper so callers don't have to deal with TanStack's internal types
export const saveRecipe = (payload: NormalizedRecipePayload) =>
  _saveRecipe({ data: payload as unknown as undefined })
import { createServerFn } from '@tanstack/react-start'
import { db } from '../../../db/client'
import { recipes } from '../../../db/schema'

export const getRecipes = createServerFn({ method: 'GET' }).handler(async () => {
  return await db.select().from(recipes)
})
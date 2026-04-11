import { useState } from 'react'
import type { InferSelectModel } from 'drizzle-orm'
import type { recipes } from '@/db/schema'
import AddRecipes from '@/components/CafeKeeperApp/Recipes/AddRecipes'
import { saveRecipe } from '@/components/CafeKeeperApp/Recipes/recipeActions'
import { getRecipes } from '@/components/CafeKeeperApp/Recipes/GetRecipes'

type Recipe = InferSelectModel<typeof recipes>

export default function RecipesMenu() {
  const [recipeList, setRecipeList] = useState<Array<Recipe>>([])
  const [showList, setShowList] = useState(false)

  const handleShowRecipes = async () => {
    const data = await getRecipes()
    setRecipeList(data)
    setShowList(true)
  }

  return (
    <section>
      <AddRecipes
        onSubmitRecipe={async (payload) => {
          await saveRecipe(payload)
        }}
      />

      <button onClick={handleShowRecipes}>Show Recipes</button>

      {showList && recipeList.map((recipe) => (
  <div key={recipe.id}>
    <strong>{recipe.title}</strong>
    {recipe.description && <p>{recipe.description}</p>}
    <p>Servings: {recipe.servings ?? '—'}</p>
    <p>Prep time: {recipe.prep_time ?? '—'} min</p>
    <p>Cook time: {recipe.cook_time ?? '—'} min</p>
    <p>Created: {recipe.created_at ? new Date(recipe.created_at).toLocaleDateString() : '—'}</p>
    <p>Updated: {recipe.updated_at ? new Date(recipe.updated_at).toLocaleDateString() : '—'}</p>
    <hr />
  </div>
))}
    </section>
  )
}
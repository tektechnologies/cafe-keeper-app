import AddRecipes from '@/components/CafeKeeperApp/Recipes/AddRecipes'
import { saveRecipe } from '@/components/CafeKeeperApp/Recipes/recipeActions'

export default function RecipesMenu() {
  return (
    <section className="features">
      <div className="feature-grid">
        <div
          className="feature-card"
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
       
          {/* <AddRecipes /> */}
          <AddRecipes onSubmitRecipe={(payload) => saveRecipe(payload)} />
        </div>
      </div>
    </section>
  )
}

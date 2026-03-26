import AddRecipes from '@/components/CafeKeeperApp/Recipes/AddRecipes'

export default function RecipesMenu() {
  return (
    <section className="features">
      <div className="feature-grid">
        <div
          className="feature-card"
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
       
          <AddRecipes />
        </div>
      </div>
    </section>
  )
}

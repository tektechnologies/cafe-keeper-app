import AddRecipes from '@/components/CafeKeeperApp/Recipes/AddRecipes'

export default function RecipesMenu() {
  return (
    <section className="features">
      <h2 className="section-title">Recipes and Menus</h2>
      <div className="feature-grid">
        <div
          className="feature-card"
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
          <h3 style={{ marginLeft: '60px' }}>Manage Recipes and Menus</h3>
          <div className="logo">
            <a className="play-regular">Cafe Keeper</a>
          </div>
          <p className="mb-6">
            Add a recipe with ingredients, steps, and tags. Submit logs a
            normalized payload (ready to connect to your API).
          </p>
          <AddRecipes />
        </div>
      </div>
    </section>
  )
}

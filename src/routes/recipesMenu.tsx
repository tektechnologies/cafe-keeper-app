import { createFileRoute } from '@tanstack/react-router'
import RecipesMenu from '@/components/Solutions/RecipesMenu'

export const Route = createFileRoute('/recipesMenu')({
  component: RecipesMenu,
})


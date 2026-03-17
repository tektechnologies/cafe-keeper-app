import { createFileRoute } from '@tanstack/react-router'
import Pricing from '@/components/Solutions/Pricing'

export const Route = createFileRoute('/pricing')({
  component: Pricing
})


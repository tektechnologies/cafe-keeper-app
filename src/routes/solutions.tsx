import { createFileRoute } from '@tanstack/react-router'
import Solutions from '@/components/Solutions/Solutions'

export const Route = createFileRoute('/solutions')({
  component: Solutions,
})


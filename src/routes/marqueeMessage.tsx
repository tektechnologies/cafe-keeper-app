import { createFileRoute } from '@tanstack/react-router'
import MarqueeMessage from '@/components/MarqueeMessage'


export const Route = createFileRoute('/marqueeMessage')({
  component: MarqueeMessage,
})


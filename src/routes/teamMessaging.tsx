import { createFileRoute } from '@tanstack/react-router'
import TeamMessaging from '@/components/Solutions/TeamMessaging'

export const Route = createFileRoute('/teamMessaging')({
  component: TeamMessaging,
})


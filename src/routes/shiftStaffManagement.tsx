import { createFileRoute } from '@tanstack/react-router'
import ShiftStaffManagement from '@/components/Solutions/ShiftStaffManagement'

export const Route = createFileRoute('/shiftStaffManagement')({
  component: ShiftStaffManagement,
})


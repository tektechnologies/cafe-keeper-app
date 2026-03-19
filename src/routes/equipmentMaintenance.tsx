import { createFileRoute } from '@tanstack/react-router'
import EquipmentMaintenance from '@/components/Solutions/EquipmentMaintenance'

export const Route = createFileRoute('/equipmentMaintenance')({
  component: EquipmentMaintenance,
})


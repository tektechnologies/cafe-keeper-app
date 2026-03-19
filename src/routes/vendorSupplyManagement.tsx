import { createFileRoute } from '@tanstack/react-router'
import VendorSupplyManagement from '@/components/Solutions/VendorSupplyManagement'

export const Route = createFileRoute('/vendorSupplyManagement')({
  component: VendorSupplyManagement,
})


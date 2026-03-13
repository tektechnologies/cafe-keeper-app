import { createFileRoute } from '@tanstack/react-router'

import Banner from '@/components/Banner'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      
      <Banner />
     
    </>
  )
}

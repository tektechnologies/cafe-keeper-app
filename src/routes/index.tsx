import { createFileRoute } from '@tanstack/react-router'

import Banner from '@/components/Banner'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      
      <Banner />
      <Footer />
    </>
  )
}

import { createFileRoute } from '@tanstack/react-router'

import Header from '../components/Navs/Header'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <Header />
      <Banner />
      <Footer />
    </>
  )
}

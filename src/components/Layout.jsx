import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet key={location.pathname} />
      </main>
      <Footer />
    </div>
  )
}

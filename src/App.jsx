import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import FavoritesProvider from './context/FavoritesProvider'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Listings from './pages/Listings'
import NotFound from './pages/NotFound'
import PropertyDetails from './pages/PropertyDetails'
import Saved from './pages/Saved'
import Sell from './pages/Sell'

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Listings mode="sale" />} />
            <Route path="/rent" element={<Listings mode="rent" />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

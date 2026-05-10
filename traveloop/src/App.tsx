import { BrowserRouter, Navigate, Route, Routes, Outlet, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'
import ActivitySearchPage from './pages/ActivitySearchPage'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage'
import CitySearchPage from './pages/CitySearchPage'
import CreateTripPage from './pages/CreateTripPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import ItineraryBuilderPage from './pages/ItineraryBuilderPage'
import ItineraryViewPage from './pages/ItineraryViewPage'
import LoginPage from './pages/LoginPage'
import MyTripsPage from './pages/MyTripsPage'
import PackingChecklistPage from './pages/PackingChecklistPage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import SharedItineraryPage from './pages/SharedItineraryPage'
import TripBudgetPage from './pages/TripBudgetPage'
import TripNotesPage from './pages/TripNotesPage'
import LandingPage from './pages/LandingPage'

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 relative pb-20 md:pb-0">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-6 right-4 z-50 md:hidden">
        <Link 
          to="/trips/new" 
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/40 transition-transform active:scale-95"
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trips/new" element={<CreateTripPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/itinerary/builder" element={<ItineraryBuilderPage />} />
            <Route path="/itinerary/view" element={<ItineraryViewPage />} />
            <Route path="/search/cities" element={<CitySearchPage />} />
            <Route path="/search/activities" element={<ActivitySearchPage />} />
            <Route path="/budget" element={<TripBudgetPage />} />
            <Route path="/packing" element={<PackingChecklistPage />} />
            <Route path="/shared/:id" element={<SharedItineraryPage />} />
            <Route path="/profile" element={<ProfileSettingsPage />} />
            <Route path="/notes" element={<TripNotesPage />} />
            <Route path="/admin" element={<AdminAnalyticsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" />
      </BrowserRouter>
  )
}

export default App

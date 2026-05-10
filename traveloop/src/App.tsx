import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginPage />} />
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
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  )
}

export default App

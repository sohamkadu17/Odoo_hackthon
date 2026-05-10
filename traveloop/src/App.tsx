import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import ActivitySearchPage from './pages/ActivitySearchPage'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage'
import CitySearchPage from './pages/CitySearchPage'
import CreateTripPage from './pages/CreateTripPage'
import DashboardPage from './pages/DashboardPage'
import ItineraryBuilderPage from './pages/ItineraryBuilderPage'
import ItineraryViewPage from './pages/ItineraryViewPage'
import LoginPage from './pages/LoginPage'
import MyTripsPage from './pages/MyTripsPage'
import PackingChecklistPage from './pages/PackingChecklistPage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import SharedItineraryPage from './pages/SharedItineraryPage'
import TripBudgetPage from './pages/TripBudgetPage'
import TripNotesPage from './pages/TripNotesPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <NavBar />
        <main className="mx-auto w-full max-w-6xl px-6 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

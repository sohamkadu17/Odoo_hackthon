import { motion } from 'framer-motion'
import { Eye, EyeOff, Plane, Globe, Wallet, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'

const highlights = [
  {
    icon: Globe,
    title: 'Multi-city Planning',
    description: 'Build complete multi-stop itineraries with smart routing.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Wallet,
    title: 'Budget Clarity',
    description: 'Auto-calculated totals with alerts when you go over plan.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: Users,
    title: 'Share Instantly',
    description: 'Send read-only itineraries to friends in one tap.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
]

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const [isRegister, setIsRegister] = useState(location.state?.isRegister || false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <motion.div
        className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.2fr,0.8fr]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Left panel — hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-300 blur-3xl" />
          </div>
          <div className="relative space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Plane className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Traveloop</span>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                Welcome back
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Plan your next journey in minutes.
              </h1>
              <p className="mt-3 text-sm text-blue-100 leading-relaxed">
                Sign in to organize multi-city itineraries, budget smarter, and share travel plans with your crew.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-1">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-blue-200 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Right panel — form */}
        <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {isRegister ? 'Create account' : 'Sign in'}
            </h2>
            <p className="text-sm text-gray-500">
              {isRegister
                ? 'Join thousands of travelers on Traveloop.'
                : 'Use your email to access saved itineraries.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    placeholder="Alex"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    placeholder="Jordan"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-sm text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-blue-600" />
                  Remember me
                </label>
                <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full mt-2">
              {isRegister ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">or continue with</span>
            </div>
          </div>

          <Button variant="secondary" className="w-full">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Button>

          <p className="mt-5 text-center text-sm text-gray-600">
            {isRegister ? 'Already have an account?' : 'New to Traveloop?'}{' '}
            <button
              type="button"
              onClick={() => setIsRegister((v) => !v)}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              {isRegister ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </section>
      </motion.div>
    </div>
  )
}

export default LoginPage

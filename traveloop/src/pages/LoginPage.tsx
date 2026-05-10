import { motion } from 'framer-motion'
import { Eye, EyeOff, Plane } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Button from '../components/Button'

// A beautiful portrait-oriented travel image (Paris)
const BG_URL = "https://picsum.photos/seed/14998/800/600"
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

type AuthResponse = {
  success: boolean
  message: string
  data?: {
    token: string
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      profilePhoto?: string
    }
  }
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const [isRegister, setIsRegister] = useState(location.state?.isRegister || false)
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const endpoint = isRegister ? '/api/auth/signup' : '/api/auth/login'
      const payload = isRegister
        ? { firstName, lastName, email, password }
        : { email, password }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as AuthResponse

      if (!response.ok || !data.success || !data.data) {
        throw new Error(data.message || 'Authentication failed')
      }

      localStorage.setItem('traveloop_token', data.data.token)
      localStorage.setItem('traveloop_user', JSON.stringify(data.data.user))

      toast.success(isRegister ? 'Account created successfully' : 'Welcome back')
      navigate('/home')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfaf7] p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex w-full max-w-[1000px] overflow-hidden rounded shadow-2xl bg-white min-h-[600px]"
      >
        {/* Left Side: Gradient with BG Image */}
        <div className="relative hidden w-5/12 flex-col items-center justify-center p-12 text-center text-white md:flex">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0">
            <img 
            loading="lazy"
              src={BG_URL} 
              alt="Travel Background" 
              className="h-full w-full object-cover" 
            />
            {/* Softened gradient overlay with warm/stone tones to match the Paris image vibe */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-800/60 to-stone-900/80" />
          </div>

          {/* Content over background */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-stone-200">Welcome To</h3>
            
            <div className="flex items-center gap-3">
              <Plane className="h-10 w-10 text-white" strokeWidth={2} />
              <h1 className="text-4xl font-extrabold tracking-wider uppercase">Traveloop</h1>
            </div>
            
            <p className="mx-auto mt-4 max-w-[200px] text-sm leading-relaxed text-stone-100 font-medium tracking-wide">
              World first premium travel dashboard based on React JS
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex w-full flex-col justify-center p-8 md:w-7/12 sm:p-14 lg:p-16">
          <h2 className="mb-8 text-center text-lg font-semibold uppercase tracking-wider text-gray-500">
            {isRegister ? 'Register For Dashboard' : 'Login To Dashboard'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Inputs - Mimicking the flat, light grey boxes from the image */}
            <div className="space-y-4">
              {isRegister && (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="w-full rounded bg-[#f9f9f9] px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="w-full rounded bg-[#f9f9f9] px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded bg-[#f9f9f9] px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded bg-[#f9f9f9] px-4 py-3.5 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {isRegister && (
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full rounded bg-[#f9f9f9] px-4 py-3.5 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              )}
            </div>

            {!isRegister && (
              <div className="mt-3 flex justify-end">
                <button type="button" className="text-xs text-stone-500 hover:text-stone-700">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading}
                className="w-full sm:w-32 rounded bg-blue-500 border-none shadow-md shadow-blue-500/30 hover:bg-blue-600"
              >
                {loading ? 'PLEASE WAIT' : isRegister ? 'REGISTER' : 'LOGIN'}
              </Button>

              <div className="text-xs text-gray-400 sm:text-right flex-1 text-center">
                {isRegister ? 'Already have an account? ' : 'If you are a new user, '}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  {isRegister ? 'Login here' : 'Signup here'}
                </button>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="relative mt-8 mb-6 text-center text-xs">
            <span className="bg-white px-3 text-gray-400 uppercase tracking-widest bg-opacity-100 z-10 relative">Or connect with</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-100" />
          </div>

          {/* Google Sign In Below */}
          <button 
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded bg-white border border-gray-200 px-4 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            onClick={() => toast('Social login is coming soon')}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </motion.div>
    </div>
  )
}

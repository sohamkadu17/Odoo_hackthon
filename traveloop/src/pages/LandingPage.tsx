import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plane, MapPin, Users, Wallet, ChevronRight, Compass } from 'lucide-react'

// Beautiful Unsplash travel background
const BG_URL = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"

const features = [
  {
    icon: Compass,
    title: 'Intuitive Itinerary Builder',
    description: 'Drag and drop your destinations and activities into a beautiful timeline.',
  },
  {
    icon: Users,
    title: 'Seamless Collaboration',
    description: 'Plan with your crew. Share read-only views or give edit access to fellow travelers.',
  },
  {
    icon: Wallet,
    title: 'Smart Budget tracking',
    description: 'Log expenses on the go and track who paid for what with visual graphs.',
  },
  {
    icon: MapPin,
    title: 'Interactive City Guides',
    description: 'Explore top destinations, hidden gems, and local secrets seamlessly.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="h-full w-full"
          >
            <img
            loading="lazy"
              src={BG_URL}
              alt="Beautiful mountain landscape"
              className="h-full w-full object-cover"
            />
          </motion.div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />
        </div>

        {/* Top Transparent Nav */}
        <nav className="relative z-10 flex w-full items-center justify-between p-6 lg:px-12">
          <div className="flex items-center gap-2.5">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
                <Plane className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Traveloop
              </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" state={{ isRegister: false }} className="text-sm font-medium text-gray-200 transition-colors hover:text-white">
              Sign in
            </Link>
            <Link
              to="/login"
              state={{ isRegister: true }}
              className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-gray-900"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center lg:mt-[-80px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">brilliantly.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
              The premium SaaS platform designed for modern travelers. Build itineraries, track budgets, and explore the world with absolute clarity.
            </p>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8, duration: 0.5 }}
               className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                to="/login"
                state={{ isRegister: true }}
                className="group flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:scale-105"
              >
                Start planning for free
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">Scroll to explore</span>
          <motion.div
             animate={{ y: [0, 8, 0] }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
             className="h-6 w-px bg-gradient-to-b from-gray-400 to-transparent"
          />
        </motion.div>
      </section>

      {/* Features Showcase */}
      <section className="bg-gray-900 py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-5xl">Designed for the <span className="text-blue-400">modern explorer</span></h2>
            <p className="mt-4 text-gray-400 text-lg">Leave the spreadsheets behind. Traveloop brings your entire trip into focus.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-2xl border border-gray-800 bg-gray-800/50 p-8 transition-all hover:bg-gray-800 hover:border-gray-700 hover:-translate-y-2"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-gray-900 p-3 ring-1 ring-gray-700/50 transition-colors group-hover:bg-blue-500/10 group-hover:ring-blue-500/30">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-100">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* App Mockup Section with Parallax feel */}
      <section className="relative overflow-hidden bg-gray-50 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your dashboard, elevated.</h2>
              <p className="mt-6 text-lg text-gray-600">
                A command center for your adventures. Beautiful cards, interactive timelines, and at-a-glance budget charts ensure you’re always in control of your journey before it even begins.
              </p>
              <div className="mt-10">
                <Link
                  to="/login"
                  state={{ isRegister: true }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                   Create an account
                   <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Faux Mockup Display */}
            <motion.div
               initial={{ opacity: 0, y: 100, rotate: 2 }}
               whileInView={{ opacity: 1, y: 0, rotate: -2 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, type: "spring" }}
               className="relative rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl shadow-blue-900/10"
            >
               <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                     <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                     <div className="h-8 w-8 bg-blue-100 rounded-full animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-indigo-50 border border-indigo-100 rounded-lg animate-pulse" />
                    <div className="h-24 bg-cyan-50 border border-cyan-100 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-40 bg-white border border-gray-100 shadow-sm rounded-lg animate-pulse mt-2 p-4">
                     <div className="h-3 w-48 bg-gray-200 rounded mb-4" />
                     <div className="h-2 w-full bg-gray-100 rounded mb-2" />
                     <div className="h-2 w-3/4 bg-gray-100 rounded mb-2" />
                     <div className="h-2 w-5/6 bg-gray-100 rounded" />
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-blue-600 py-24 text-center px-4">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="mx-auto max-w-3xl space-y-8"
         >
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Ready to pack up?</h2>
            <p className="text-blue-100 text-lg">Join today and build your first premium itinerary entirely for free.</p>
            <Link
               to="/login"
               state={{ isRegister: true }}
               className="inline-flex rounded-full bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-lg transition-transform hover:scale-105"
            >
              Get Started
            </Link>
         </motion.div>
      </section>
    </div>
  )
}

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoState, setDemoState] = useState<'idle' | 'running' | 'completed'>('idle')

  const toggleMenu = () => setIsOpen(!isOpen)

  // Demo control functions
  const startDemo = () => {
    setDemoState('running')
    window.dispatchEvent(new CustomEvent('demoStart'))
  }

  const stopDemo = () => {
    setDemoState('idle')
    window.dispatchEvent(new CustomEvent('demoStop'))
  }

  const resetDemo = () => {
    setDemoState('idle')
    window.dispatchEvent(new CustomEvent('demoReset'))
  }

  // Listen for demo completion
  useEffect(() => {
    const handleDemoCompleted = () => {
      setDemoState('completed')
    }

    window.addEventListener('demoCompleted', handleDemoCompleted)
    return () => window.removeEventListener('demoCompleted', handleDemoCompleted)
  }, [])

  // Scroll detection for demo interface
  useEffect(() => {
    const handleScroll = () => {
      const demoInterface = document.querySelector('[data-demo-interface]')
      if (!demoInterface) return

      const rect = demoInterface.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.25 && rect.bottom > window.innerHeight * 0.5

      if (inView && !isDemoMode) {
        setIsDemoMode(true)
      } else if (!inView && isDemoMode) {
        setIsDemoMode(false)
        setDemoState('idle') // Reset demo state when leaving
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDemoMode])



  return (
    <>
      {/* Fixed navbar at top */}
      <div className="fixed top-0 left-0 right-0 flex justify-start md:justify-center w-full py-4 md:py-6 px-2 md:px-4 z-[99998]">
        <motion.div
          className={`flex items-center justify-between px-4 md:px-8 py-2.5 rounded-full w-full relative transition-all duration-500 ${
            isDemoMode
              ? 'max-w-[95vw] md:max-w-4xl bg-white/95 border border-cyan-400/40 shadow-2xl shadow-cyan-400/30 backdrop-blur-xl'
              : 'max-w-[95vw] md:max-w-6xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-md'
          }`}
          animate={{
            scale: isDemoMode ? 1.02 : 1,
          }}
          transition={{ duration: 0.5 }}
          style={{
            boxShadow: isDemoMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : undefined
          }}
        >
          {isDemoMode ? (
            // Demo Control Interface
            <>
              <div className="flex items-center flex-1 min-w-0">
                <div className={`w-3 h-3 rounded-full mr-2 md:mr-3 flex-shrink-0 ${
                  demoState === 'running' ? 'bg-green-400 animate-pulse' :
                  demoState === 'completed' ? 'bg-blue-400' : 'bg-gray-400'
                }`}></div>
                <div className="text-xs md:text-sm font-mono truncate">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 font-semibold">
                    {demoState === 'idle' ? 'Demo Ready' :
                     demoState === 'running' ? 'Running...' :
                     'Complete'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                {demoState === 'idle' && (
                  <button
                    onClick={startDemo}
                    className="px-2 md:px-3 py-1 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
                  >
                    Start
                  </button>
                )}

                {demoState === 'running' && (
                  <button
                    onClick={stopDemo}
                    className="px-2 md:px-3 py-1 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                  >
                    Stop
                  </button>
                )}

                {(demoState === 'completed' || demoState === 'running') && (
                  <button
                    onClick={resetDemo}
                    className="px-2 md:px-3 py-1 text-xs font-medium bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                  >
                    Reset
                  </button>
                )}

                <div className="hidden md:flex items-center space-x-1 text-xs text-gray-600">
                  <span>DEMO</span>
                  <div className={`w-2 h-2 rounded-full ${
                    demoState === 'running' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                </div>
              </div>
            </>
          ) : (
            // Normal Navbar Mode
            <>
              {/* Spacer for mobile to balance menu button - hidden on desktop */}
              <div className="md:hidden w-9 flex-shrink-0"></div>

              {/* Logo - Centered on mobile, left on desktop */}
              <div className="flex items-center flex-shrink-0 flex-1 md:flex-initial justify-center md:justify-start">
                <div className="mr-0 md:mr-4">
                  <span className="text-base md:text-lg font-bold inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      HeyJarvis
                    </span>
                  </span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {['','',''].map((item) => (
                  <span key={item} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                    {item}
                  </span>
                ))}
              </nav>

              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <button
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full text-white transition-all"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #2563eb, #7c3aed)',
                  }}
                >
                  Join Waitlist
                </button>
              </div>
            </>
          )}

          {/* Mobile Menu Button - Always visible */}
          <button
            className="md:hidden flex items-center p-1.5 md:p-2 rounded-lg transition-colors flex-shrink-0"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className={`h-5 w-5 ${isDemoMode ? 'text-gray-700' : 'text-white/90'}`} />
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-xl z-[99999] pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6 text-white/90" />
            </button>
            <div className="flex flex-col space-y-6">
              <a href="#" className="text-base text-white/90 font-medium" onClick={toggleMenu}></a>
              <a href="#" className="text-base text-white/90 font-medium" onClick={toggleMenu}></a>
              <a href="#" className="text-base text-white/90 font-medium" onClick={toggleMenu}></a>
              <button
                className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 backdrop-blur-sm rounded-full transition-all duration-300"
                onClick={toggleMenu}
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { Navbar1 }
export default Navbar1

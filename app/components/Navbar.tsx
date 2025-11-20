'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'certifications', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  // Enhanced menu animations
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: "easeOut"
      }
    }
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: 50, rotate: -10 },
    open: { 
      opacity: 1, 
      x: 0, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const navigationItems = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Certifications', 'Contact']

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer relative"
            >
              AR
            </motion.div>

            {/* Centered Navigation Links with floating effect */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-12">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative group text-sm font-medium transition-all ${
                    activeSection === item.toLowerCase()
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  
                  {/* Animated underline with gradient */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: activeSection === item.toLowerCase() ? "100%" : "0%"
                    }}
                    whileHover={{ 
                      width: "100%",
                      transition: { duration: 0.2 }
                    }}
                  />
                  
                  {/* Enhanced hover effect */}
                  <motion.div 
                    className="absolute -inset-3 rounded-lg bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: activeSection === item.toLowerCase() ? 0.2 : 0
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Active indicator with pulse */}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -inset-3 bg-purple-600/5 rounded-lg"
                      initial={false}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(139, 92, 246, 0.2)",
                          "0 0 0 8px rgba(139, 92, 246, 0)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right spacing div */}
            <div className="w-[50px] hidden md:block" />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-around"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 }
                    }}
                    className="w-full h-0.5 bg-purple-400 block"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="w-full h-0.5 bg-purple-400 block"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 }
                    }}
                    className="w-full h-0.5 bg-purple-400 block"
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              id="mobile-menu"
              className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0B]/95 backdrop-blur-lg shadow-lg py-4 px-4 border-t border-purple-500/20"
            >
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item}
                    variants={menuItemVariants}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'bg-purple-900/40 text-purple-300'
                        : 'text-gray-200 hover:bg-purple-900/30'
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Cube = ({ delay = 0 }) => {
  return (
    <motion.div
      className="w-16 h-16 relative transform-gpu perspective-1000"
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
        delay
      }}
    >
      {/* Front face */}
      <motion.div className="absolute w-full h-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm transform-gpu translate-z-8" />
      {/* Back face */}
      <motion.div className="absolute w-full h-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm transform-gpu -translate-z-8" />
      {/* Right face */}
      <motion.div className="absolute w-full h-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm transform-gpu translate-x-8 rotate-y-90" />
      {/* Left face */}
      <motion.div className="absolute w-full h-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm transform-gpu -translate-x-8 -rotate-y-90" />
      {/* Top face */}
      <motion.div className="absolute w-full h-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm transform-gpu -translate-y-8 rotate-x-90" />
      {/* Bottom face */}
      <motion.div className="absolute w-full h-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm transform-gpu translate-y-8 -rotate-x-90" />
    </motion.div>
  )
}

const FloatingSphere = ({ delay = 0 }) => {
  return (
    <motion.div
      className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 border border-purple-500/30 backdrop-blur-sm"
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1],
        rotateY: [0, 180, 360],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  )
}

const Ring = ({ delay = 0 }) => {
  return (
    <motion.div
      className="relative w-24 h-24 transform-gpu perspective-1000"
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 backdrop-blur-sm" />
      <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 transform rotate-45" />
      <div className="absolute inset-0 rounded-full border-4 border-purple-500/10 transform -rotate-45" />
    </motion.div>
  )
}

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="py-20 relative bg-[#1a1025] text-gray-100 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Animated Heading */}
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-shimmer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          About Me
        </motion.h2>

        {/* Profile Image with Glow and Floating Animation - Centered */}
        <motion.div 
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-blue-300 blur-xl opacity-80"
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              style={{ zIndex: 1 }}
          />
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="relative z-10">
              <Image
                src="/my1.png"
                alt="Akila Ravithas"
                width={256}
                height={256}
                priority
                sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 16rem, (min-width: 640px) 14rem, 12rem"
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full object-cover border-4 border-white"
                style={{ boxShadow: '0 0 0 8px rgba(0,255,255,0.2), 0 0 40px 8px rgba(0,180,255,0.3)' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Description with fade/slide-in - Centered */}
        <motion.div
          className="text-base sm:text-lg text-white max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <p className="leading-relaxed">
          I am an undergraduate in Computer Science & Technology at Uva Wellassa University of Sri Lanka (Class of 2026), with a strong foundation in full-stack development and a passion for creating innovative digital solutions. My technical skill set includes Java, C, JavaScript, Python, HTML, CSS, React, JSP, PHP, and Android Studio, enabling me to build both web and mobile applications that are efficient, scalable, and user-focused.

I am particularly driven by solving real-world problems through technology and take pride in delivering clean, maintainable code and intuitive user experiences. My involvement in the university chess team has also sharpened my analytical and strategic thinking, qualities I bring into every development project.

I'm always open to new challenges, collaborations, and opportunities to grow as a developer and problem solver.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
  
'use client'

import React, { useEffect, useRef } from 'react'
import { ArrowDown, Github, Linkedin, Twitter, Code, Briefcase, Mail, Download, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCallback } from "react"
import Particles from "@tsparticles/react"
import type { Container, Engine } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { useState } from 'react'
import Image from 'next/image'

const phrases = [
  'Building modern web apps',
  'Transforming ideas into code',
  'Delivering elegant solutions',
]

function TypewriterText() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)
  const [delay, setDelay] = useState(150)

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1200)
      return
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % phrases.length)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
    }, deleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting])

  useEffect(() => {
    const blinkTimeout = setInterval(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearInterval(blinkTimeout)
  }, [])

  return (
    <span>
      {phrases[index].substring(0, subIndex)}
      <span className={blink ? 'opacity-100' : 'opacity-0'}>|</span>
    </span>
  )
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          value_area: 900
        }
      },
      color: {
        value: "#ffffff"
      },
      links: {
        enable: true,
        color: "#ffffff",
        opacity: 0.1,
        distance: 150
      },
      move: {
        enable: true,
        speed: 0.3
      },
      opacity: {
        value: 0.1
      },
      size: {
        value: 2
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        }
      },
      modes: {
        repulse: {
          distance: 100
        }
      }
    },
    background: {
      color: {
        value: "transparent"
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center relative overflow-visible md:overflow-hidden bg-[#0A0A0B] pt-16 px-4 sm:px-6"
    >
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B] via-[#13131A] to-[#1C1C24] opacity-80"
        style={{ y, opacity }}
      />
      
      {/* Particles */}
      <Particles options={particlesOptions} className="absolute inset-0" />
      
      {/* Content */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center min-h-[70vh] relative z-10 max-w-[1100px] w-full gap-12">
        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start justify-center w-full max-w-2xl">
          <motion.div 
            className="w-full max-w-4xl mx-auto text-center lg:text-left px-2 sm:px-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            

            {/* Name */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-space-grotesk tracking-tight text-center lg:text-left"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Akila Ravithas</span>
              </span>
            </motion.h1>

            {/* Title */}
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-medium font-sora mb-10 text-center lg:text-left"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.span
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-purple-500/30 shadow-[0_0_25px_rgba(59,130,246,0.25)] animate-attractive-gradient text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-[length:200%_200%] bg-clip-text text-transparent"
                style={{ textShadow: '0 0 16px #a5b4fc, 0 0 32px #f472b6' }}
                animate={{ scale: [1, 1.08, 1], boxShadow: [
                  '0 0 25px #38bdf8',
                  '0 0 40px #a21caf',
                  '0 0 25px #fbbf24',
                  '0 0 25px #38bdf8',
                ] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                whileHover={{ scale: 1.12 }}
              >
                <Code size={28} className="text-cyan-300 drop-shadow-lg" />
                Full Stack Developer
              </motion.span>
            </motion.div>

            {/* Animated Typewriter Text */}
            <motion.div
              className="mt-6 mb-10 text-lg text-cyan-300 font-semibold font-inter max-w-2xl mx-auto lg:mx-0 text-center lg:text-left min-h-[32px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <TypewriterText />
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="flex gap-12 mb-10 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row w-full max-w-2xl mx-auto lg:mx-0 gap-4 sm:gap-6 md:gap-8 mb-8 justify-center lg:justify-start items-stretch sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
            >
              <a
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group inline-flex items-center gap-2 font-semibold text-lg bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-200 cursor-pointer relative w-full sm:w-auto justify-center"
              >
                <Briefcase size={20} className="text-cyan-400" />
                <span>View My Work</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group inline-flex items-center gap-2 font-semibold text-lg bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-200 cursor-pointer relative w-full sm:w-auto justify-center"
              >
                <Mail size={20} className="text-cyan-400" />
                <span>Contact Me</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                onClick={() => {
                  window.open('/MyCv.pdf', '_blank');
                }}
                className="group inline-flex items-center gap-2 font-semibold text-lg bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-200 cursor-pointer relative w-full sm:w-auto justify-center"
              >
                <Download size={20} className="text-cyan-400" />
                <span>Download CV</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 mb-6 text-sm sm:text-base w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="mailto:ravithasakila@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                <span className="text-sm">ravithasakila@gmail.com</span>
              </motion.a>
              <motion.a
                href="tel:0760546676"
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                <span className="text-sm">0760546676</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center justify-center lg:justify-start flex-wrap gap-6 sm:gap-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { icon: Github, href: "https://github.com/Akila05A" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/akila-ravithas-717732280/" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-purple-400 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
        {/* Photo Section (right side, plain) */}
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto mt-8 lg:mt-0 max-w-sm sm:max-w-md mx-auto lg:mx-0">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/myPhoto1.png"
              alt="Akila Ravithas"
              width={320}
              height={320}
              priority
              sizes="(min-width: 1280px) 16rem, (min-width: 1024px) 14rem, (min-width: 640px) 12rem, 10rem"
              className="w-28 h-40 sm:w-40 sm:h-56 md:w-48 md:h-64 lg:w-56 lg:h-72 xl:w-64 xl:h-80 object-contain mx-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <motion.a 
            href="#about" 
            className="text-gray-400 hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.2 }}
          >
            <ArrowDown size={30} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

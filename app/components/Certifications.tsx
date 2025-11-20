'use client'

import { motion } from 'framer-motion'
import { Award, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'

interface Certification {
  title: string
  issuer: string
  issueDate: string
  credentialId?: string
  skills?: string[]
  image?: string
  credentialUrl?: string
}

const certifications: Certification[] = [
  {
    title: 'Introduction to Microsoft Azure',
    issuer: 'Microsoft Learn Student Ambassadors',
    issueDate: 'Dec 2024',
    image: 'UIUX.png',
  },
  {
    title: 'UI/UX for Beginners',
    issuer: 'Great Learning',
    issueDate: 'Nov 2024',
    skills: ['User Interface Design', 'User Experience (UX)'],
    image: 'ux.png',
  },
  {
    title: 'Contemporary Practices in Psychology',
    issuer: 'Institute of Engineering Studies',
    issueDate: 'Oct 2024',
    skills: ['Psychology'],
    image: 'PSYCHOLOGY.jpg',
  },
  {
    title: 'UVAXTREME 1.0',
    issuer: 'Uva Wellassa University of Sri Lanka',
    issueDate: 'Jun 2024',
    skills: ['Java', 'Coding Experience'],
    image: 'UvaXtrame.jpg',
  },
  {
    title: 'Introduction to Java',
    issuer: 'Sololearn',
    issueDate: 'Oct 2023',
    credentialId: 'CC-18ENM23Z',
    skills: ['Java', 'Coding Experience'],
    image: 'IntroductionToJava.jpeg',
  },
  {
    title: 'PC Application',
    issuer: 'DMI Computer Education',
    issueDate: 'Dec 2022',
    credentialId: 'DPCA/SA/330/2021/2F00226',
    skills: ['Programming with VB.NET', 'Hardware Technology'],
  },
  {
    title: 'Python for Beginners',
    issuer: 'Centre for Open & Distance Learning(CODL) University of Moratuwa, Sri Lanka',
    issueDate: 'May 2022',
    credentialId: 'M5XFdFSt99',
    image: 'PhythonForBeginners.jpeg',
  },
  {
    title: 'JAVA Programming Language',
    issuer: 'DMI Computer Education',
    issueDate: 'Apr 2022',
    credentialId: 'CJL/JA/3405/2021/2A000808',
    skills: ['Java program', 'Coding Experience'],
  },
  {
    title: 'Front-End Development',
    issuer: 'CODL University of Moratuwa, Sri Lanka',
    issueDate: '2022',
    credentialId: 'uXpoeFjVYa',
    image: 'Front-End.jpeg',
  },
  {
    title: 'Web Design for Beginners',
    issuer: 'CODL University of Moratuwa, Sri Lanka',
    issueDate: '2022',
    skills: ['Web Design', 'HTML5'],
    image: 'WebDesign.jpeg',
  },
]

const CertificationCard = ({ certification }: { certification: Certification }) => (
  <div className="group relative min-w-[260px] sm:min-w-[320px] max-w-xs">
    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl opacity-25 blur group-hover:opacity-60 transition-opacity duration-300" />
    <div className="relative h-full rounded-2xl border border-emerald-500/20 bg-gray-900/70 backdrop-blur-sm p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {certification.image ? (
            <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-emerald-500/20 bg-gray-800">
              <Image
                src={`/${certification.image}`}
                alt={certification.title}
                fill
                sizes="(min-width: 640px) 5rem, 4rem"
                className="object-cover"
              />
            </div>
          ) : (
            <span className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300 flex-shrink-0">
              <Award className="h-6 w-6 sm:h-8 sm:w-8" />
            </span>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">{certification.title}</h3>
            <p className="text-xs sm:text-sm text-emerald-300 mb-2">{certification.issuer}</p>
            {certification.credentialId && (
              <p className="text-xs text-gray-400 font-mono">ID: {certification.credentialId}</p>
            )}
          </div>
        </div>
        <span className="text-xs sm:text-sm font-medium text-white/80 px-2 sm:px-3 py-1 rounded-full border border-white/10 whitespace-nowrap flex-shrink-0">
          {certification.issueDate}
        </span>
      </div>

      {certification.skills && certification.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-500/10">
          {certification.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {certification.credentialUrl && (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors mt-2"
        >
          View credential →
        </a>
      )}
    </div>
  </div>
)

export default function Certifications() {
  // Duplicate list once for seamless infinite marquee (second half is a copy of the first)
  const marqueeList = [...certifications, ...certifications]
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startAutoScroll = useCallback(() => {
    if (animationFrameRef.current) return

    const step = () => {
      const container = scrollRef.current
      if (!container) return

      container.scrollLeft += 0.5
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      }
      animationFrameRef.current = requestAnimationFrame(step)
    }

    animationFrameRef.current = requestAnimationFrame(step)
  }, [])

  const stopAutoScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoScroll()
    return () => {
      stopAutoScroll()
    }
  }, [startAutoScroll, stopAutoScroll])

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    stopAutoScroll()

    const scrollAmount = container.clientWidth * 0.8
    if (direction === 'left' && container.scrollLeft <= 0) {
      container.scrollLeft = container.scrollWidth / 2
    } else if (direction === 'right' && container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0
    }

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })

    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll()
    }, 2000)
  }, [startAutoScroll, stopAutoScroll])

  return (
    <section id="certifications" className="py-20 sm:py-24 bg-[#0C0F1A] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-cyan-900/10 pointer-events-none"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-base sm:text-lg uppercase tracking-[0.3em] text-emerald-300 mb-3">Certifications</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            Continuous Learning
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Certifications and credentials demonstrating my commitment to continuous learning across cloud computing, programming, web development, and design.
          </p>
        </motion.div>

        {/* Horizontal marquee, single row */}
        <div className="relative">
          {/* Fading edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0C0F1A] via-[#0C0F1A] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0C0F1A] via-[#0C0F1A] to-transparent z-10" />

          <div
            ref={scrollRef}
            className="overflow-x-scroll scrollbar-hide"
          >
            <div className="flex w-max flex-nowrap gap-4 sm:gap-6 lg:gap-8 py-2 pr-6">
              {marqueeList.map((certification, index) => (
                <CertificationCard key={`${certification.title}-${index}`} certification={certification} />
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            type="button"
            aria-label="Scroll certifications left"
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-emerald-500/20 p-2 text-emerald-200 backdrop-blur hover:bg-emerald-500/40 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll certifications right"
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-emerald-500/20 p-2 text-emerald-200 backdrop-blur hover:bg-emerald-500/40 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}



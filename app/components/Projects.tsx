'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaReact, FaDocker, FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiMongodb, SiFigma, SiNextdotjs } from 'react-icons/si'
import Image from 'next/image'

interface Project {
  name: string
  description: string
  image: string
  tech: string[]
  demoLink: string
  
}

interface TechIcon {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  name: string
}

const projects: Project[] = [
  { 
    name: 'AutoCare Lanka',
   description: 'Multi-role vehicle service platform with online booking, course enrollment, and job opportunities.',
   image: 'autocare.png',
   tech: ['React', 'Bootstrap', 'PHP', 'MySQL'],
   demoLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7322264860765949952/',  // Replace with your live demo URL if available
   
  },
  { 
    name: 'Moviesphere',
    description: 'Full-stack movie browsing platform with category filtering, reviews, and secure user authentication.',
    image: 'movie.png',
    tech: ['React', 'Vite', 'Django', 'Tailwind CSS'],
    demoLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7320711255818735616/',  // Replace with your deployed site URL if available
    
  },
  {
    name: 'ArtOfCake',
    description: 'Built with HTML, CSS, JavaScript, and Bootstrap. Responsive design with interactive UI and clean visuals.',
    image: 'artofcake.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    demoLink: 'https://drive.google.com/file/d/1KGofnH7OmdUaA1n8iU-oqHAy2TFclLeS/view?usp=drive_link',
    
  },
  {
    name: 'Medicine Reminder App',
    description: 'Track, and receive reminders for medication, ensuring timely doses and improved health habits.',
    image: 'medi.png',
    tech: ['Flutter', 'Dart', 'Firebase'],
    demoLink: '#',  // Replace with your live demo or APK link if available
    
  },
  {
    name: 'Portfolio Website',
    description: 'Modern, responsive portfolio with smooth animations and interactive UI to showcase skills and projects.',
    image: 'portfolio.png',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    demoLink: '#',
    
  },
  
  
  
]

const techIcons = [
  { icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
  { icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
  { icon: FaJs, color: '#F7DF1E', name: 'JavaScript' },
  { icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
  // { icon: FaNodeJs, color: '#339933', name: 'Node.js' },
  { icon: FaReact, color: '#61DAFB', name: 'React' },
  
  { icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind' },
  { icon: SiFigma, color: '#F24E1E', name: 'Figma' },
]

interface FloatingIconProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  name: string
  index: number
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, color, name, index }) => {
  const iconRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const isInView = useInView(iconRef, { once: true })

  const floatY = useSpring(0, {
    stiffness: 100,
    damping: 10,
    mass: 1
  })

  useEffect(() => {
    let timeoutId: number
    const animate = () => {
      const y = Math.sin(Date.now() / 1000 + index * 0.5) * 10
      floatY.set(y)
      timeoutId = requestAnimationFrame(animate)
    }
    timeoutId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(timeoutId)
  }, [floatY.set, index])

  return (
    <motion.div
      ref={iconRef}
      className="relative group"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ y: floatY }}
    >
      <motion.div 
        className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="relative p-5 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 transform transition-all duration-300 group-hover:scale-110 group-hover:border-purple-500/40 cursor-pointer">
        <Icon 
          className="w-10 h-10 transition-all duration-300 group-hover:scale-110"
          style={{ 
            color: isHovered ? '#fff' : color,
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' : 'none'
          }}
        />
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-900/90 backdrop-blur-sm border border-purple-500/20 whitespace-nowrap shadow-lg"
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-25 group-hover:opacity-75 blur transition duration-300" />
      <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden">
        {/* Project Image with Parallax */}
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg group cursor-pointer">
          <motion.div
            className="absolute inset-0 bg-purple-600/20"
            animate={{ opacity: isHovered ? 0.4 : 0.2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div className="absolute inset-0" animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.6 }}>
            <Image
              src={`/${project.image}`}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={index < 2}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <a 
              href={project.demoLink}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        <motion.h3 
          className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors"
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.name}
        </motion.h3>
        <motion.p
          className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors"
          initial={false}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack with Staggered Animation */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <motion.span 
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.1 }}
              className="text-sm px-3 py-1 bg-purple-600/10 text-purple-300 rounded-full hover:bg-purple-600/20 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons with Hover Effect */}
        <div className="flex gap-3">
          <motion.a 
            href={project.demoLink}
            className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-all flex-1 text-center relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Live Demo</span>
            <motion.div
              className="absolute inset-0 bg-purple-600/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
  
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [visibleProjects, setVisibleProjects] = useState(3)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  
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

  const handleViewMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length))
  }

  const hasMoreProjects = visibleProjects < projects.length

    return (
    <section className="py-20 relative bg-[#1a1025] overflow-hidden" id="projects" ref={containerRef}>
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#2e1065]/50 to-purple-900/20"
        style={{ y }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6 mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {techIcons.map((tech, index) => (
            <FloatingIcon key={tech.name} {...tech} index={index} />
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
        
        {/* View More Button */}
        {hasMoreProjects && (
          <div className="flex justify-center">
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-lg flex items-center gap-3 group"
              onClick={handleViewMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
    )
  }
  
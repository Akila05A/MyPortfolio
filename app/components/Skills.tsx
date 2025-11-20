'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaCode, FaDatabase, FaPalette, FaTools, FaRocket, FaBrain, FaServer, FaMobile } from 'react-icons/fa'
import { SiJavascript, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFirebase, SiAmazon, SiFigma, SiAdobexd } from 'react-icons/si'

interface SkillCategory {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  skills: string[]
  color: string
  description: string
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    icon: FaCode,
    color: "#61DAFB",
    description: "Building responsive and interactive user interfaces",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS",]
  },
  {
    name: "Backend Development",
    icon: FaServer,
    color: "#339933",
    description: "Creating robust server-side applications and APIs",
    skills: ["PHP", "Django", "C"]
  },
  {
    name: "Database & Cloud",
    icon: FaDatabase,
    color: "#0066CC",
    description: "Managing data and cloud infrastructure",
    skills: [ "Mysql","PostgreSQL", "Firebase", "Git"]
  },
//   {
//     name: "Design & Tools",
//     icon: FaPalette,
//     color: "#FF6B6B",
//     description: "Creating beautiful and functional designs",
//     skills: ["Figma", "Adobe XD", "Responsive Design", "UI/UX", "Prototyping", "Design Systems"]
//   },
//   {
//     name: "Mobile Development",
//     icon: FaMobile,
//     color: "#FF6B35",
//     description: "Building cross-platform mobile applications",
//     skills: ["React Native", "Progressive Web Apps", "Mobile-first Design", "Touch Interactions"]
//   },
  {
    name: "Problem Solving",
    icon: FaBrain,
    color: "#9C27B0",
    description: "Analytical thinking and algorithm design",
    skills: ["Data Structures", "Algorithms", "Code Optimization", "Debugging"]
  }
]

const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-25 group-hover:opacity-75 blur transition duration-300" />
      <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 mr-4">
            <Icon className="w-6 h-6" style={{ color: category.color }} />
          </div>
          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{category.description}</p>
        
        <div className="space-y-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: skillIndex * 0.1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-gray-300 text-sm">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const TechnologyIcon = ({ tech, index }: { tech: { icon: any; name: string; color: string }; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = tech.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-4 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300 text-center">
        <Icon 
          className="w-8 h-8 mx-auto mb-2" 
          style={{ color: isHovered ? '#8B5CF6' : tech.color }}
        />
        <p className="text-xs text-gray-400 group-hover:text-white transition-colors">
          {tech.name}
        </p>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#1a1025] text-gray-100 overflow-hidden px-4 sm:px-6 lg:px-8" id="skills">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-[#2e1065]/50 to-purple-900/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Animated geometric shapes */}
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-pink-800/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [20, -20, 20],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="h-1 w-12 bg-purple-400 mb-6 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          />
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Technologies I Work With</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {[
              { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
              { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
              { icon: SiReact, name: "React", color: "#61DAFB" },
              { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
              { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
    
              
              { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
              { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
              
              { icon: SiGit, name: "Git", color: "#F05032" },
              
              { icon: SiFigma, name: "Figma", color: "#F24E1E" },
              
            ].map((tech, index) => (
              <TechnologyIcon key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <FaRocket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies and best practices in web development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
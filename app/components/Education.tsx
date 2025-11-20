'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'

interface EducationItem {
  degree: string
  institution: string
  year: string
  description: string
}

const educationData: EducationItem[] = [
  {
    degree: "BSc (Hons) in Computer Science & Technology",
    institution: "Uva Wellassa University of Sri Lanka",
    year: "2022 - Present",
    description: "Current undergraduate, Class of 2026."
  },
  {
    degree: "G.C.E. Advanced Level – Physical Science Stream",
    institution: "J/Skandavarodaya College",
    year: "2018 - 2021",
    description: "Completed secondary education in the physical science stream."
  }
]

const EducationCard = ({ education, index }: { education: EducationItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="group relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-25 group-hover:opacity-75 blur transition duration-300" />
      <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 w-fit">
            <FaGraduationCap className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{education.degree}</h3>
            <p className="text-blue-400 font-medium mb-1">{education.institution}</p>
            <p className="text-gray-400 text-sm mb-3">{education.year}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{education.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#0F0F23] text-gray-100 overflow-hidden px-4 sm:px-6 lg:px-8" id="education">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-indigo-900/50 to-blue-900/20"
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
          className="absolute top-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute top-0 right-0 w-96 h-96 bg-indigo-800/20 rounded-full mix-blend-multiply filter blur-xl"
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
            className="h-1 w-12 bg-blue-400 mb-6 mx-auto"
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
            Education
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            My educational journey that has shaped my passion for technology and innovation.
          </motion.p>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            {educationData.map((education, index) => (
              <EducationCard key={index} education={education} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
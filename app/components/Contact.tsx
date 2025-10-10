'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface FormInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

interface FormTextareaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

const AnimatedSphere = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color="#8B5CF6" wireframe />
    </mesh>
  )
}

const FormInput: React.FC<FormInputProps> = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  )
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all min-h-[150px]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  )
}

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { type: 'success' | 'error'; msg: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    if (!name || !email || !message) {
      setStatus({ type: 'error', msg: 'Please fill out all fields.' })
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      if (!res.ok) {
        // Try to extract server-provided error info (in dev includes `detail`)
        let errMsg = 'Failed to send'
        try {
          const data = await res.json()
          if (data?.error) errMsg = data.error + (data?.detail ? `: ${data.detail}` : '')
        } catch (_) {}
        throw new Error(errMsg)
      }
      setStatus({ type: 'success', msg: 'Message sent successfully!' })
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send message. Please try again.'
      setStatus({ type: 'error', msg })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen bg-[#1a1025] text-white py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#2e1065]/50 to-purple-900/20 pointer-events-none" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 2%)',
          backgroundSize: '3px 3px'
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        {/* Mobile Contact Info */}
        <motion.div 
          className="lg:hidden mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <FaEnvelope className="mx-auto text-2xl sm:text-3xl mb-2 text-white" />
              <a href="mailto:ravithasakila@gmail.com" className="text-base sm:text-lg hover:text-white transition-colors text-white/90">
                ravithasakila@gmail.com
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <FaLinkedin className="mx-auto text-2xl sm:text-3xl mb-2 text-white" />
              <a
                href= "https://www.linkedin.com/in/akila-ravithas-717732280/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg hover:text-white transition-colors text-white/90"
              >
                LinkedIn Profile
              </a>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-800 w-full max-w-xl mx-auto"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ delay: 0.5 }}
              className="h-1 w-12 bg-purple-600 mb-6"
            />
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Get in touch.
            </motion.h2>
            <motion.p 
              className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Let's work together! Fill out the form below.
            </motion.p>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <FormInput label="Your Name" placeholder="What's your name?" value={name} onChange={setName} />
              <FormInput label="Your Email" type="email" placeholder="What's your email?" value={email} onChange={setEmail} />
              <FormTextarea label="Your Message" placeholder="What do you want to say?" value={message} onChange={setMessage} />
              
              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 text-white py-2.5 sm:py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors relative overflow-hidden group text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{submitting ? 'Sending...' : 'Send Message'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </form>

            {/* Status feedback */}
            {status && (
              <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.msg}
              </p>
            )}
          </motion.div>

          {/* 3D Sphere Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-[400px] sm:h-[500px] relative hidden lg:block"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 2.5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls 
                  enableZoom={false}
                  autoRotate={!isHovered}
                  autoRotateSpeed={5}
                />
                <AnimatedSphere />
              </Canvas>
            </div>

            {/* Contact Info Overlay */}
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="pointer-events-auto"
                >
                  <FaEnvelope className="mx-auto text-3xl mb-2 text-white" />
                  <a href="mailto:ravithasakila@gmail.com" className="text-lg hover:text-white transition-colors text-white/90">
                    ravithasakila@gmail.com
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="pointer-events-auto"
                >
                  <FaLinkedin className="mx-auto text-3xl mb-2 text-white" />
                  <a
                     href= "https://www.linkedin.com/in/akila-ravithas-717732280/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:text-white transition-colors text-white/90"
                  >
                    LinkedIn Profile
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

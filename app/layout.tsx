import type { Metadata, Viewport } from 'next'
import { Inter, Sora, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ 
  subsets: ['latin'], 
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700']
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700']
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#030712',
}

export const metadata: Metadata = {
  title: 'Akila Ravithas - Portfolio',
  description: 'Full Stack Developer Portfolio showcasing web development projects and skills',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"%3E%3Crect width="32" height="32" fill="%230A0A0B"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%238B5CF6"%3EAR%3C/text%3E%3C/svg%3E',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"%3E%3Crect width="16" height="16" fill="%230A0A0B"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="8" fill="%238B5CF6"%3EAR%3C/text%3E%3C/svg%3E',
        sizes: '16x16',
        type: 'image/svg+xml',
      }
    ],
    apple: [
      {
        url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180"%3E%3Crect width="180" height="180" fill="%230A0A0B"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="90" fill="%238B5CF6"%3EAR%3C/text%3E%3C/svg%3E',
        sizes: '180x180',
        type: 'image/svg+xml',
      }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akilaravithas.com',
    title: 'Akila Ravithas - Full Stack Developer',
    description: 'Full Stack Developer Portfolio showcasing web development projects and skills',
    siteName: 'Akila Ravithas Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akila Ravithas - Full Stack Developer',
    description: 'Full Stack Developer Portfolio showcasing web development projects and skills',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} ${sora.variable} ${spaceGrotesk.variable} font-sans antialiased relative`}>
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}

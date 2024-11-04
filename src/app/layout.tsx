import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { Nunito } from 'next/font/google'
import Providers from '@/components/Providers'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

export const metadata = {
  title: 'MUCalSync',
  description: 'Sync your MUERP timetable with Google Calendar',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} antialiased transition-colors duration-300 dark:bg-[#0a0a0a] bg-[#f0f9ff] dark:text-white text-gray-900`}>
        <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="gradient-circles" />
          {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
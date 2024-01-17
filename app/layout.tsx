import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trible App',
  description: 'Find a community that matters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-white text-black dark:bg-[#1C2529] dark:text-[#00E091]")}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false} storageKey='trible-theme'>
        {children}
      </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}

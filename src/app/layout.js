// src/app/layout.js
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/hooks/useAuth'

export const metadata = {
  title: 'Ever - Galanteria Skórzana',
  description: 'Sklep z galanterią skórzaną najwyższej jakości',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
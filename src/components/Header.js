// src/components/Header.js
'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOtwarte, setMenuOtwarte] = useState(false)

  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
            Ever
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-800 font-medium">
              Strona główna
            </Link>
            <Link href="/produkty" className="text-gray-600 hover:text-gray-800 font-medium">
              Produkty
            </Link>
            <Link href="/kategorie" className="text-gray-600 hover:text-gray-800 font-medium">
              Kategorie
            </Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-gray-800 font-medium">
              Kontakt
            </Link>
          </nav>

          {/* Akcje użytkownika */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/koszyk" className="text-gray-600 hover:text-gray-800">
              🛒 Koszyk (0)
            </Link>
            <Link href="/logowanie" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
              Logowanie
            </Link>
          </div>

          {/* Menu mobilne - przycisk */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMenuOtwarte(!menuOtwarte)}
          >
            ☰
          </button>
        </div>

        {/* Navigation Mobile */}
        {menuOtwarte && (
          <nav className="md:hidden py-4 border-t">
            <Link href="/" className="block py-2 text-gray-600 hover:text-gray-800">
              Strona główna
            </Link>
            <Link href="/produkty" className="block py-2 text-gray-600 hover:text-gray-800">
              Produkty
            </Link>
            <Link href="/kategorie" className="block py-2 text-gray-600 hover:text-gray-800">
              Kategorie
            </Link>
            <Link href="/kontakt" className="block py-2 text-gray-600 hover:text-gray-800">
              Kontakt
            </Link>
            <Link href="/koszyk" className="block py-2 text-gray-600 hover:text-gray-800">
              🛒 Koszyk (0)
            </Link>
            <Link href="/logowanie" className="block py-2 text-gray-600 hover:text-gray-800">
              Logowanie
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
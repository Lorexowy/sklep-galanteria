// src/app/logowanie/page.js
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function StronaLogowania() {
  const [formData, setFormData] = useState({
    email: '',
    haslo: ''
  })
  const [pokazHaslo, setPokazHaslo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await login(formData.email, formData.haslo)
    
    if (result.success) {
      router.push('/moje-konto')
    } else {
      setError('Nieprawidłowy email lub hasło')
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                Witaj ponownie
              </h1>
              <p className="text-gray-600">
                Zaloguj się do swojego konta Ever
              </p>
            </div>

            {/* Błędy */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Adres e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors text-gray-900"
                  placeholder="twoj@email.com"
                />
              </div>

              <div>
                <label htmlFor="haslo" className="block text-sm font-semibold text-gray-800 mb-2">
                  Hasło
                </label>
                <div className="relative">
                  <input
                    type={pokazHaslo ? "text" : "password"}
                    id="haslo"
                    name="haslo"
                    value={formData.haslo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors text-gray-900 pr-12"
                    placeholder="Wprowadź hasło"
                  />
                  <button
                    type="button"
                    onClick={() => setPokazHaslo(!pokazHaslo)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {pokazHaslo ? <span className="text-lg">👁️</span> : <span className="text-lg">🙈</span>}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'LOGOWANIE...' : 'ZALOGUJ SIĘ'}
              </button>
            </form>

            <div className="text-center pt-6 border-t-2 border-gray-100 mt-8">
              <p className="text-gray-700 font-medium">
                Nie masz jeszcze konta?{' '}
                <Link 
                  href="/rejestracja"
                  className="text-gray-900 hover:text-gray-700 font-bold underline"
                >
                  Zarejestruj się tutaj
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
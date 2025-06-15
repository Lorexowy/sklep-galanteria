// src/app/rejestracja/page.js
'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function StronaRejestracji() {
  const [formData, setFormData] = useState({
    imie: '',
    nazwisko: '',
    email: '',
    haslo: '',
    powtorzHaslo: '',
    telefon: '',
    newsletter: false,
    regulamin: false
  })
  const [pokazHaslo, setPokazHaslo] = useState(false)
  const [pokazPowtorzHaslo, setPokazPowtorzHaslo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Podstawowa walidacja
    const newErrors = {}
    if (formData.haslo !== formData.powtorzHaslo) {
      newErrors.powtorzHaslo = 'Hasła muszą być identyczne'
    }
    if (formData.haslo.length < 6) {
      newErrors.haslo = 'Hasło musi mieć minimum 6 znaków'
    }
    if (!formData.regulamin) {
      newErrors.regulamin = 'Musisz zaakceptować regulamin'
    }

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      // Później tutaj będzie logika Firebase Auth
      console.log('Rejestracja:', formData)
      setTimeout(() => setLoading(false), 1000) // Symulacja
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Usuń błąd gdy użytkownik zaczyna pisać
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Karta rejestracji */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                Utwórz konto
              </h1>
              <p className="text-gray-600">
                Dołącz do społeczności Ever i ciesz się zakupami
              </p>
            </div>

            {/* Formularz rejestracji */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Imię i Nazwisko */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="imie" className="block text-sm font-semibold text-gray-800 mb-2">
                    Imię *
                  </label>
                  <input
                    type="text"
                    id="imie"
                    name="imie"
                    value={formData.imie}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors text-gray-900"
                    placeholder="Twoje imię"
                  />
                </div>
                
                <div>
                  <label htmlFor="nazwisko" className="block text-sm font-semibold text-gray-800 mb-2">
                    Nazwisko *
                  </label>
                  <input
                    type="text"
                    id="nazwisko"
                    name="nazwisko"
                    value={formData.nazwisko}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors text-gray-900"
                    placeholder="Twoje nazwisko"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Adres e-mail *
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

              {/* Telefon */}
              <div>
                <label htmlFor="telefon" className="block text-sm font-semibold text-gray-800 mb-2">
                  Numer telefonu
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors text-gray-900"
                  placeholder="+48 123 456 789"
                />
              </div>

              {/* Hasło */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="haslo" className="block text-sm font-semibold text-gray-800 mb-2">
                    Hasło *
                  </label>
                  <div className="relative">
                    <input
                      type={pokazHaslo ? "text" : "password"}
                      id="haslo"
                      name="haslo"
                      value={formData.haslo}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors text-gray-900 pr-12 ${
                        errors.haslo ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Minimum 6 znaków"
                    />
                    <button
                      type="button"
                      onClick={() => setPokazHaslo(!pokazHaslo)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {pokazHaslo ? <span className="text-lg">👁️</span> : <span className="text-lg">🙈</span>}
                    </button>
                  </div>
                  {errors.haslo && <p className="text-red-600 text-sm mt-1 font-medium">{errors.haslo}</p>}
                </div>

                <div>
                  <label htmlFor="powtorzHaslo" className="block text-sm font-semibold text-gray-800 mb-2">
                    Powtórz hasło *
                  </label>
                  <div className="relative">
                    <input
                      type={pokazPowtorzHaslo ? "text" : "password"}
                      id="powtorzHaslo"
                      name="powtorzHaslo"
                      value={formData.powtorzHaslo}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors text-gray-900 pr-12 ${
                        errors.powtorzHaslo ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Powtórz hasło"
                    />
                    <button
                      type="button"
                      onClick={() => setPokazPowtorzHaslo(!pokazPowtorzHaslo)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {pokazPowtorzHaslo ? <span className="text-lg">👁️</span> : <span className="text-lg">🙈</span>}
                    </button>
                  </div>
                  {errors.powtorzHaslo && <p className="text-red-600 text-sm mt-1 font-medium">{errors.powtorzHaslo}</p>}
                </div>
              </div>

              {/* Checkboxy */}
              <div className="space-y-4">
                {/* Newsletter */}
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="w-5 h-5 text-gray-900 border-2 border-gray-400 rounded focus:ring-2 focus:ring-gray-900 mt-0.5"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Chcę otrzymywać newsletter z informacjami o nowościach i promocjach
                  </span>
                </label>

                {/* Regulamin */}
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="regulamin"
                    checked={formData.regulamin}
                    onChange={handleChange}
                    className={`w-5 h-5 text-gray-900 border-2 rounded focus:ring-2 focus:ring-gray-900 mt-0.5 ${
                      errors.regulamin ? 'border-red-400' : 'border-gray-400'
                    }`}
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Akceptuję{' '}
                    <Link href="/regulamin" className="text-gray-900 underline hover:text-gray-700 font-medium">
                      regulamin
                    </Link>
                    {' '}i{' '}
                    <Link href="/polityka-prywatnosci" className="text-gray-900 underline hover:text-gray-700 font-medium">
                      politykę prywatności
                    </Link>
                    {' '}*
                  </span>
                </label>
                {errors.regulamin && <p className="text-red-600 text-sm font-medium">{errors.regulamin}</p>}
              </div>

              {/* Przycisk rejestracji */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'TWORZENIE KONTA...' : 'UTWÓRZ KONTO'}
              </button>
            </form>

            {/* Dział */}
            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600 font-medium">lub zarejestruj się z</span>
                </div>
              </div>
            </div>

            {/* Rejestracja przez Google */}
            <button className="w-full border-2 border-gray-300 text-gray-800 py-4 px-6 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-semibold mb-6 flex items-center justify-center">
              <span className="mr-3 text-xl">🔍</span>
              Zarejestruj się przez Google
            </button>

            {/* Link do logowania */}
            <div className="text-center pt-6 border-t-2 border-gray-100">
              <p className="text-gray-700 font-medium">
                Masz już konto?{' '}
                <Link 
                  href="/logowanie"
                  className="text-gray-900 hover:text-gray-700 font-bold underline"
                >
                  Zaloguj się tutaj
                </Link>
              </p>
            </div>
          </div>

          {/* Bezpieczeństwo */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 flex items-center justify-center">
              <span className="mr-2">🔒</span>
              Twoje dane są bezpieczne i nigdy nie są udostępniane osobom trzecim
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
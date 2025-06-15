// src/app/moje-konto/page.js
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { doc, updateDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { updateProfile, updatePassword } from 'firebase/auth'
import { db } from '@/lib/firebase'
import Link from 'next/link'

export default function PanelUzytkownika() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState('profil')
  const [zamowienia, setZamowienia] = useState([])
  const [loadingZamowienia, setLoadingZamowienia] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  
  // Dane profilu
  const [profilData, setProfilData] = useState({
    imie: '',
    nazwisko: '',
    email: '',
    telefon: ''
  })
  
  // Zmiana hasła
  const [hasloData, setHasloData] = useState({
    obecneHaslo: '',
    noweHaslo: '',
    powtorzNoweHaslo: ''
  })

  // Przekieruj jeśli nie zalogowany
  useEffect(() => {
    if (!loading && !user) {
      router.push('/logowanie?message=wymagane_logowanie')
    }
  }, [user, loading, router])

  // Załaduj dane użytkownika
  useEffect(() => {
    if (user) {
      setProfilData({
        imie: user.imie || '',
        nazwisko: user.nazwisko || '',
        email: user.email || '',
        telefon: user.telefon || ''
      })
    }
  }, [user])

  // Załaduj zamówienia użytkownika
  useEffect(() => {
    if (user && activeTab === 'zamowienia') {
      pobierzZamowienia()
    }
  }, [user, activeTab])

  const pobierzZamowienia = async () => {
    setLoadingZamowienia(true)
    try {
      const q = query(
        collection(db, 'zamowienia'),
        where('userId', '==', user.uid),
        orderBy('stworzono', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      const zamowieniaData = []
      
      querySnapshot.forEach((doc) => {
        zamowieniaData.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      setZamowienia(zamowieniaData)
    } catch (error) {
      console.error('Błąd pobierania zamówień:', error)
      setMessage('Błąd pobierania zamówień')
    } finally {
      setLoadingZamowienia(false)
    }
  }

  const aktualizujProfil = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    
    try {
      // Aktualizuj Firebase Auth
      await updateProfile(user, {
        displayName: `${profilData.imie} ${profilData.nazwisko}`
      })
      
      // Aktualizuj Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        imie: profilData.imie,
        nazwisko: profilData.nazwisko,
        telefon: profilData.telefon,
        displayName: `${profilData.imie} ${profilData.nazwisko}`,
        zaktualizowano: new Date()
      })
      
      setMessage('Profil zaktualizowany pomyślnie!')
    } catch (error) {
      console.error('Błąd aktualizacji profilu:', error)
      setMessage('Błąd aktualizacji profilu')
    } finally {
      setSaving(false)
    }
  }

  const zmienHaslo = async (e) => {
    e.preventDefault()
    
    if (hasloData.noweHaslo !== hasloData.powtorzNoweHaslo) {
      setMessage('Nowe hasła muszą być identyczne')
      return
    }
    
    if (hasloData.noweHaslo.length < 6) {
      setMessage('Nowe hasło musi mieć minimum 6 znaków')
      return
    }
    
    setSaving(true)
    setMessage('')
    
    try {
      await updatePassword(user, hasloData.noweHaslo)
      setMessage('Hasło zmienione pomyślnie!')
      setHasloData({ obecneHaslo: '', noweHaslo: '', powtorzNoweHaslo: '' })
    } catch (error) {
      console.error('Błąd zmiany hasła:', error)
      setMessage('Błąd zmiany hasła. Spróbuj się wylogować i zalogować ponownie.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">⏳</div>
          <p className="text-gray-600">Ładowanie...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Komponent będzie przekierowany przez useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Witaj, {user.imie || user.displayName || 'Użytkowniku'}! 👋
          </h1>
          <p className="text-gray-600">
            Zarządzaj swoim kontem i zamówieniami
          </p>
        </div>

        {/* Komunikaty */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('pomyślnie') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profil')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profil' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  👤 Mój profil
                </button>
                <button
                  onClick={() => setActiveTab('zamowienia')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'zamowienia' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  📦 Moje zamówienia
                </button>
                <button
                  onClick={() => setActiveTab('ustawienia')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'ustawienia' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  ⚙️ Ustawienia
                </button>
                
                {/* Szybkie linki */}
                <div className="pt-4 border-t">
                  <Link href="/koszyk" className="block px-4 py-2 text-gray-600 hover:text-gray-900">
                    🛒 Koszyk
                  </Link>
                  <Link href="/produkty" className="block px-4 py-2 text-gray-600 hover:text-gray-900">
                    🛍️ Kontynuuj zakupy
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Główna zawartość */}
          <div className="lg:col-span-3">
            
            {/* Tab: Profil */}
            {activeTab === 'profil' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Dane profilu
                </h2>
                
                <form onSubmit={aktualizujProfil} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Imię *
                      </label>
                      <input
                        type="text"
                        value={profilData.imie}
                        onChange={(e) => setProfilData({...profilData, imie: e.target.value})}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Nazwisko *
                      </label>
                      <input
                        type="text"
                        value={profilData.nazwisko}
                        onChange={(e) => setProfilData({...profilData, nazwisko: e.target.value})}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profilData.email}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Email nie może być zmieniony
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={profilData.telefon}
                      onChange={(e) => setProfilData({...profilData, telefon: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
                  >
                    {saving ? 'Zapisywanie...' : 'Zapisz zmiany'}
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Zamówienia */}
            {activeTab === 'zamowienia' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Historia zamówień
                </h2>
                
                {loadingZamowienia ? (
                  <div className="text-center py-8">
                    <div className="text-lg text-gray-600">Ładowanie zamówień...</div>
                  </div>
                ) : zamowienia.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Brak zamówień
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Nie masz jeszcze żadnych zamówień
                    </p>
                    <Link 
                      href="/produkty"
                      className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                    >
                      Rozpocznij zakupy
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {zamowienia.map((zamowienie) => (
                      <div key={zamowienie.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Zamówienie #{zamowienie.id.slice(-8)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {zamowienie.stworzono?.toDate?.()?.toLocaleDateString() || 'Brak daty'}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {zamowienie.suma || 0} zł
                            </div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              zamowienie.status === 'zrealizowane' 
                                ? 'bg-green-100 text-green-800'
                                : zamowienie.status === 'w_trakcie'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {zamowienie.status || 'nowe'}
                            </span>
                          </div>
                        </div>
                        
                        {zamowienie.produkty && (
                          <div className="text-sm text-gray-600">
                            {zamowienie.produkty.length} produktów
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Ustawienia */}
            {activeTab === 'ustawienia' && (
              <div className="space-y-8">
                
                {/* Zmiana hasła */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Zmiana hasła
                  </h2>
                  
                  <form onSubmit={zmienHaslo} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Obecne hasło
                      </label>
                      <input
                        type="password"
                        value={hasloData.obecneHaslo}
                        onChange={(e) => setHasloData({...hasloData, obecneHaslo: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Nowe hasło *
                      </label>
                      <input
                        type="password"
                        value={hasloData.noweHaslo}
                        onChange={(e) => setHasloData({...hasloData, noweHaslo: e.target.value})}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="Minimum 6 znaków"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Powtórz nowe hasło *
                      </label>
                      <input
                        type="password"
                        value={hasloData.powtorzNoweHaslo}
                        onChange={(e) => setHasloData({...hasloData, powtorzNoweHaslo: e.target.value})}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
                    >
                      {saving ? 'Zmienianie hasła...' : 'Zmień hasło'}
                    </button>
                  </form>
                </div>

                {/* Informacje o koncie */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Informacje o koncie
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Typ konta:</span>
                      <span className="font-semibold">{user.role === 'admin' ? 'Administrator' : 'Klient'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data rejestracji:</span>
                      <span className="font-semibold">
                        {user.createdAt?.toDate?.()?.toLocaleDateString() || 'Brak danych'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID użytkownika:</span>
                      <span className="font-mono text-sm text-gray-500">{user.uid}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
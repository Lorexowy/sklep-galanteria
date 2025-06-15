// src/app/koszyk/page.js
'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function StronaKoszyka() {
  // Stan koszyka - później będzie z context/Firebase
  const [produktyWKoszyku, setProduktyWKoszyku] = useState([
    {
      id: '1',
      nazwa: 'Elegancka torebka skórzana Milano',
      cena: 299,
      ilosc: 1,
      zdjecie: 'torebka.jpg',
      kategoria: 'Torebki'
    },
    {
      id: '2', 
      nazwa: 'Klasyczny portfel męski Vienna',
      cena: 149,
      ilosc: 2,
      zdjecie: 'portfel.jpg',
      kategoria: 'Portfele'
    }
  ])

  // Funkcje do zarządzania koszykiem
  const zmienIlosc = (id, nowaIlosc) => {
    if (nowaIlosc === 0) {
      usunProdukt(id)
      return
    }
    setProduktyWKoszyku(prev => 
      prev.map(produkt => 
        produkt.id === id ? { ...produkt, ilosc: nowaIlosc } : produkt
      )
    )
  }

  const usunProdukt = (id) => {
    setProduktyWKoszyku(prev => prev.filter(produkt => produkt.id !== id))
  }

  // Obliczenia
  const sumaProduktow = produktyWKoszyku.reduce((suma, produkt) => suma + (produkt.cena * produkt.ilosc), 0)
  const kosztDostawy = sumaProduktow >= 150 ? 0 : 15
  const sumaCalkowita = sumaProduktow + kosztDostawy

  if (produktyWKoszyku.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-8">🛒</div>
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Twój koszyk jest pusty
            </h1>
            <p className="text-gray-700 mb-8">
              Dodaj produkty do koszyka i wróć tutaj aby sfinalizować zakupy
            </p>
            <Link 
              href="/produkty"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              ROZPOCZNIJ ZAKUPY
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            KOSZYK
          </h1>
          <p className="text-gray-700 font-medium">
            {produktyWKoszyku.length} {produktyWKoszyku.length === 1 ? 'produkt' : 'produkty'} w koszyku
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Lewa strona - Produkty */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {produktyWKoszyku.map((produkt) => (
                <div key={produkt.id} className="flex items-center gap-6 p-6 border border-gray-200 rounded-lg">
                  
                  {/* Zdjęcie produktu */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">
                      {produkt.kategoria === 'Torebki' ? '👜' : '👛'}
                    </span>
                  </div>

                  {/* Informacje o produkcie */}
                  <div className="flex-1">
                    <Link 
                      href={`/produkt/${produkt.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-gray-700 block mb-1"
                    >
                      {produkt.nazwa}
                    </Link>
                    <p className="text-gray-700 text-sm mb-2 font-medium">{produkt.kategoria}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {produkt.cena} zł
                    </p>
                  </div>

                  {/* Kontrolki ilości */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => zmienIlosc(produkt.id, produkt.ilosc - 1)}
                      className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-700 font-semibold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900">
                      {produkt.ilosc}
                    </span>
                    <button 
                      onClick={() => zmienIlosc(produkt.id, produkt.ilosc + 1)}
                      className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-700 font-semibold"
                    >
                      +
                    </button>
                  </div>

                  {/* Suma za produkt */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {produkt.cena * produkt.ilosc} zł
                    </p>
                    <button 
                      onClick={() => usunProdukt(produkt.id)}
                      className="text-red-600 hover:text-red-800 text-sm mt-1 font-medium"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Kontynuuj zakupy */}
            <div className="mt-8">
              <Link 
                href="/produkty"
                className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                ← Kontynuuj zakupy
              </Link>
            </div>
          </div>

          {/* Prawa strona - Podsumowanie */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-lg sticky top-8">
              
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Podsumowanie zamówienia
              </h2>

              {/* Szczegóły kosztów */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Wartość produktów:</span>
                  <span className="font-semibold text-gray-900">{sumaProduktow} zł</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Dostawa:</span>
                  <span className="font-semibold">
                    {kosztDostawy === 0 ? (
                      <span className="text-green-700">Darmowa</span>
                    ) : (
                      <span className="text-gray-900">{kosztDostawy} zł</span>
                    )}
                  </span>
                </div>

                {sumaProduktow < 150 && (
                  <div className="text-sm text-gray-800 bg-blue-50 p-3 rounded border border-blue-200">
                    Dodaj produkty za {150 - sumaProduktow} zł aby otrzymać darmową dostawę
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Suma całkowita:</span>
                  <span className="text-gray-900">{sumaCalkowita} zł</span>
                </div>
              </div>

              {/* Przyciski */}
              <div className="space-y-3">
                <button className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  PRZEJDŹ DO PŁATNOŚCI
                </button>
                
                <button className="w-full border-2 border-gray-400 text-gray-800 py-4 px-6 rounded-lg hover:border-gray-600 hover:text-gray-900 transition-colors font-medium">
                  ZAPISZ KOSZYK
                </button>
              </div>

              {/* Bezpieczeństwo */}
              <div className="mt-6 pt-6 border-t text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 font-medium">
                  <span>🔒 Bezpieczne płatności</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
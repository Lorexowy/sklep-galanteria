// src/components/ProduktyZBazy.js
'use client'
import Link from 'next/link'
import { useProdukty } from '@/hooks/useProdukty'

export default function ProduktyZBazy() {
  const { produkty, loading, error } = useProdukty()

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-gray-600">Ładowanie produktów...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">Błąd: {error}</div>
      </div>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            PRODUKTY Z BAZY DANYCH
          </h2>
          <p className="text-gray-600">
            Znaleziono {produkty.length} produktów
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produkty.map((produkt) => (
            <Link 
              key={produkt.id} 
              href={`/produkt/${produkt.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border">
                
                {/* Zdjęcie produktu */}
                <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">
                      {produkt.kategoria === 'torebki' ? '👜' : 
                       produkt.kategoria === 'portfele' ? '👛' : '👔'}
                    </span>
                  </div>
                  
                  {/* Badges */}
                  {produkt.cenaPrzed && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-medium rounded">
                      SALE
                    </div>
                  )}
                  
                  {produkt.dostepnosc === 'maly_stock' && (
                    <div className="absolute top-4 right-4 bg-orange-600 text-white px-2 py-1 text-xs font-medium rounded">
                      OSTATNIE
                    </div>
                  )}
                </div>

                {/* Informacje o produkcie */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {produkt.kategoria}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                    {produkt.nazwa}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {produkt.opis}
                  </p>

                  {/* Cena */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-semibold text-gray-900">
                        {produkt.cena} zł
                      </span>
                      {produkt.cenaPrzed && (
                        <span className="text-sm text-gray-400 line-through">
                          {produkt.cenaPrzed} zł
                        </span>
                      )}
                    </div>
                    
                    {/* Dostępność */}
                    <div className="flex items-center text-sm">
                      {produkt.dostepnosc === 'dostepny' ? (
                        <span className="text-green-600">✓ Dostępny</span>
                      ) : (
                        <span className="text-orange-600">⚠ Ostatnie {produkt.stockIlosc} szt.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
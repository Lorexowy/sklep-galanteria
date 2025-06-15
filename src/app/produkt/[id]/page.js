// src/app/produkt/[id]/page.js
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Pobierz produkt z Firebase
async function pobierzProdukt(id) {
  try {
    const docRef = doc(db, 'produkty', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Błąd pobierania produktu:', error)
    return null
  }
}

export default async function StronaProduktu({ params }) {
  const produkt = await pobierzProdukt(params.id)
  
  if (!produkt) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-700">Strona główna</Link></li>
            <li>›</li>
            <li><Link href="/kategorie" className="hover:text-gray-700">Kategorie</Link></li>
            <li>›</li>
            <li><Link href={`/kategorie/${produkt.kategoria}`} className="hover:text-gray-700">{produkt.kategoria}</Link></li>
            <li>›</li>
            <li className="text-gray-900">{produkt.nazwa}</li>
          </ol>
        </nav>

        {/* Główna zawartość produktu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Lewa strona - Zdjęcia */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-8xl text-gray-400">
                {produkt.kategoria === 'torebki' ? '👜' : 
                 produkt.kategoria === 'portfele' ? '👛' : '👔'}
              </span>
            </div>
          </div>

          {/* Prawa strona - Informacje */}
          <div>
            {/* Nagłówek produktu */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500 capitalize">{produkt.kategoria}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{produkt.podkategoria}</span>
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                {produkt.nazwa}
              </h1>
              
              {/* Cena */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-semibold text-gray-900">
                  {produkt.cena} zł
                </span>
                {produkt.cenaPrzed && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {produkt.cenaPrzed} zł
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      -{Math.round((1 - produkt.cena/produkt.cenaPrzed) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Status dostępności */}
              <div className="mb-6">
                {produkt.dostepnosc === 'dostepny' && (
                  <span className="inline-flex items-center text-green-700 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Dostępny • {produkt.stockIlosc} szt. w magazynie
                  </span>
                )}
                {produkt.dostepnosc === 'maly_stock' && (
                  <span className="inline-flex items-center text-orange-700 text-sm">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Ostatnie sztuki • {produkt.stockIlosc} szt. pozostało
                  </span>
                )}
              </div>
            </div>

            {/* Opis */}
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed">
                {produkt.opis}
              </p>
            </div>

            {/* Akcje */}
            <div className="space-y-4 mb-8">
              <button className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg">
                DODAJ DO KOSZYKA
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors font-medium">
                DODAJ DO ULUBIONYCH ♡
              </button>
            </div>

            {/* Szczegóły produktu */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Szczegóły produktu
              </h3>
              <ul className="space-y-2">
                {produkt.szczegoly?.map((szczegol, index) => (
                  <li key={index} className="text-gray-600 text-sm">
                    • {szczegol}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
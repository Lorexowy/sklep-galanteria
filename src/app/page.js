// src/app/page.js
import Link from 'next/link'
import FirebaseTest from '@/components/FirebaseTest'
import ProduktyZBazy from '@/components/ProduktyZBazy'

export default function StrGlowna() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Test Firebase - ukryty komponent */}
      <FirebaseTest />
      
      {/* Sekcja Hero */}
      <section className="relative h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Lewa strona - Obraz */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-lg h-96 lg:h-[500px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-8xl mb-4">👜</div>
                  <p className="text-lg">Zdjęcie produktu</p>
                </div>
              </div>
            </div>

            {/* Reszta kodu strony głównej bez zmian... */}

            {/* Prawa strona - Tekst */}
            <div className="order-1 lg:order-2">
              <div className="max-w-xl">
                <h1 className="text-5xl lg:text-7xl font-light text-gray-900 mb-6">
                  NOWA
                  <br />
                  <span className="font-bold">Kolekcja 2025</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Odkryj najnowszą kolekcję galanterii skórzanej Ever. 
                  Każdy produkt to perfekcyjne połączenie stylu, funkcjonalności i najwyższej jakości.
                </p>
                <Link 
                  href="/produkty"
                  className="inline-block bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  KUP TERAZ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja korzyści - jak w inspiracji */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">DARMOWA DOSTAWA</h3>
              <p className="text-sm text-gray-600">Darmowa wysyłka od 150 zł</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">💳</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">MEMBER DISCOUNT</h3>
              <p className="text-sm text-gray-600">Zniżki dla stałych klientów</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">BEZPIECZNE PŁATNOŚCI</h3>
              <p className="text-sm text-gray-600">Wszystkie dane są szyfrowane</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">📞</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1-800-123-45-67</h3>
              <p className="text-sm text-gray-600">Obsługa klienta 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popularne produkty - siatka jak w inspiracji */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">POPULARNE W TYM TYGODNIU</h2>
            <p className="text-gray-600">Sprawdź nasze najchętniej wybierane produkty przez klientów</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Produkt 1 */}
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square">
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 text-xs font-medium">
                  SALE
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">👛</span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Skórzany portfel damski</h3>
              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-semibold">149 zł</span>
                <span className="text-gray-400 line-through text-sm">199 zł</span>
              </div>
            </div>

            {/* Produkt 2 */}
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">👜</span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Elegancka torebka skórzana</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">299 zł</span>
              </div>
            </div>

            {/* Produkt 3 */}
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square">
                <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 text-xs font-medium">
                  NEW
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">👔</span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Klasyczny pasek skórzany</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">89 zł</span>
              </div>
            </div>

            {/* Produkt 4 */}
            <div className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square">
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-medium">
                  HOT
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">💼</span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Biznesowa teczka skórzana</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">449 zł</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/produkty"
              className="inline-block border-2 border-black text-black px-8 py-3 font-medium hover:bg-black hover:text-white transition-colors"
            >
              ZOBACZ WSZYSTKIE PRODUKTY
            </Link>
          </div>
        </div>
        <ProduktyZBazy />
      </section>
    </div>
  )
}
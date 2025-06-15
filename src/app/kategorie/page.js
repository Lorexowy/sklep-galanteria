// src/app/kategorie/page.js
import Link from 'next/link'

export default function StronaKategorie() {
  const kategorie = [
    {
      nazwa: 'Torebki',
      slug: 'torebki',
      opis: 'Eleganckie torebki na każdą okazję',
      produktyCount: 45,
      gradient: 'from-rose-100 to-pink-100'
    },
    {
      nazwa: 'Portfele',
      slug: 'portfele',
      opis: 'Stylowe portfele damskie i męskie',
      produktyCount: 32,
      gradient: 'from-amber-100 to-orange-100'
    },
    {
      nazwa: 'Paski',
      slug: 'paski',
      opis: 'Klasyczne paski skórzane',
      produktyCount: 28,
      gradient: 'from-stone-100 to-neutral-100'
    },
    {
      nazwa: 'Teczki',
      slug: 'teczki',
      opis: 'Biznesowe teczki i aktówki',
      produktyCount: 18,
      gradient: 'from-slate-100 to-gray-100'
    },
    {
      nazwa: 'Walizki',
      slug: 'walizki',
      opis: 'Walizki podróżne wszystkich rozmiarów',
      produktyCount: 24,
      gradient: 'from-blue-100 to-indigo-100'
    },
    {
      nazwa: 'Plecaki',
      slug: 'plecaki',
      opis: 'Praktyczne plecaki skórzane',
      produktyCount: 16,
      gradient: 'from-green-100 to-emerald-100'
    },
    {
      nazwa: 'Akcesoria',
      slug: 'akcesoria',
      opis: 'Drobne akcesoria skórzane',
      produktyCount: 22,
      gradient: 'from-purple-100 to-violet-100'
    },
    {
      nazwa: 'Torby Podróżne',
      slug: 'torby-podrozne',
      opis: 'Pojemne torby na podróże',
      produktyCount: 12,
      gradient: 'from-teal-100 to-cyan-100'
    },
    {
      nazwa: 'Biżuteria',
      slug: 'bizuteria',
      opis: 'Elegancka biżuteria ze skóry',
      produktyCount: 8,
      gradient: 'from-yellow-100 to-amber-100'
    }
  ]

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        
        {/* Header z więcej szczegółów */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            KATEGORIE PRODUKTÓW
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Odkryj naszą pełną kolekcję galanterii skórzanej. 
            Każda kategoria oferuje unikalne produkty najwyższej jakości.
          </p>
          <div className="w-20 h-px bg-gray-300 mx-auto"></div>
        </div>

        {/* Siatka kategorii - bardziej żywa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {kategorie.map((kategoria) => (
            <Link 
              key={kategoria.slug} 
              href={`/kategorie/${kategoria.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                
                {/* Zdjęcie z kolorowym gradientem */}
                <div className={`relative h-48 bg-gradient-to-br ${kategoria.gradient} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {kategoria.slug === 'torebki' ? '👜' : 
                       kategoria.slug === 'portfele' ? '👛' :
                       kategoria.slug === 'paski' ? '👔' :
                       kategoria.slug === 'teczki' ? '💼' :
                       kategoria.slug === 'walizki' ? '🧳' :
                       kategoria.slug === 'plecaki' ? '🎒' :
                       kategoria.slug === 'akcesoria' ? '🔑' :
                       kategoria.slug === 'torby-podrozne' ? '🛍️' : '💎'}
                    </div>
                    <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                      {kategoria.produktyCount} produktów
                    </span>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                
                {/* Treść karty */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {kategoria.nazwa}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {kategoria.opis}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">
                      {kategoria.produktyCount} produktów
                    </span>
                    <span className="text-sm text-gray-900 group-hover:text-gray-600 transition-colors font-medium">
                      Zobacz produkty →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sekcja dodatkowa */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Karta 1 */}
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">🇵🇱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Made in Poland</h3>
            <p className="text-gray-600 text-sm">
              Wszystkie nasze produkty są wykonywane przez polskich rzemieślników z najwyższej jakości materiałów.
            </p>
          </div>

          {/* Karta 2 */}
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Jakość Premium</h3>
            <p className="text-gray-600 text-sm">
              Używamy tylko skóry naturalnej najwyższej jakości, która z wiekiem staje się jeszcze piękniejsza.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center mt-20 pt-20 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Szukasz czegoś konkretnego?
          </h2>
          <p className="text-gray-500 mb-8">
            Sprawdź wszystkie nasze produkty lub skontaktuj się z nami
          </p>
          <div className="space-x-4">
            <Link 
              href="/produkty"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              WSZYSTKIE PRODUKTY
            </Link>
            <Link 
              href="/kontakt"
              className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors font-medium"
            >
              KONTAKT
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
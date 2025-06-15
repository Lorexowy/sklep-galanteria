// src/app/kategorie/[kategoria]/page.js
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Dane kategorii - później z Firebase
const kategorieData = {
  'torebki': {
    nazwa: 'Torebki',
    opis: 'Eleganckie torebki skórzane na każdą okazję',
    podkategorie: [
      { nazwa: 'Torebki na ramię', slug: 'na-ramie' },
      { nazwa: 'Torebki do ręki', slug: 'do-reki-dollarino' },
      { nazwa: 'Torebki przewieszane', slug: 'przewieszane' },
      { nazwa: 'Torebki wieczorowe', slug: 'wieczorowe' },
      { nazwa: 'Torebki lniane', slug: 'lniane' }
    ],
    produkty: 45
  },
  'portfele': {
    nazwa: 'Portfele',
    opis: 'Stylowe portfele damskie i męskie ze skóry naturalnej',
    podkategorie: [
      { nazwa: 'Damskie', slug: 'damskie' },
      { nazwa: 'Męskie', slug: 'meskie' },
      { nazwa: 'Etui', slug: 'etui' }
    ],
    produkty: 32
  },
  'paski': {
    nazwa: 'Paski',
    opis: 'Klasyczne paski skórzane dla mężczyzn i kobiet',
    podkategorie: [
      { nazwa: 'Damskie', slug: 'damskie' },
      { nazwa: 'Męskie', slug: 'meskie' }
    ],
    produkty: 28
  },
  'teczki': {
    nazwa: 'Teczki',
    opis: 'Biznesowe teczki i aktówki najwyższej jakości',
    podkategorie: [
      { nazwa: 'Teczki damskie', slug: 'damskie' },
      { nazwa: 'Teczki męskie', slug: 'meskie' }
    ],
    produkty: 18
  },
  'walizki': {
    nazwa: 'Walizki',
    opis: 'Walizki podróżne wszystkich rozmiarów',
    podkategorie: [
      { nazwa: 'Walizki małe', slug: 'male' },
      { nazwa: 'Walizki średnie', slug: 'srednie' },
      { nazwa: 'Walizki duże', slug: 'duze' }
    ],
    produkty: 24
  },
  'plecaki': {
    nazwa: 'Plecaki',
    opis: 'Praktyczne plecaki skórzane',
    podkategorie: [
      { nazwa: 'Plecaki damskie', slug: 'damskie' },
      { nazwa: 'Plecaki męskie', slug: 'meskie' }
    ],
    produkty: 16
  },
  'akcesoria': {
    nazwa: 'Akcesoria',
    opis: 'Drobne akcesoria skórzane',
    podkategorie: [
      { nazwa: 'Akcesoria podróżne', slug: 'podrozne' }
    ],
    produkty: 22
  },
  'torby-podrozne': {
    nazwa: 'Torby Podróżne',
    opis: 'Pojemne torby na podróże',
    podkategorie: [],
    produkty: 12
  },
  'bizuteria': {
    nazwa: 'Biżuteria',
    opis: 'Elegancka biżuteria ze skóry',
    podkategorie: [],
    produkty: 8
  }
}

export default function StronaKategorii({ params }) {
  const kategoria = kategorieData[params.kategoria]
  
  // Jeśli kategoria nie istnieje
  if (!kategoria) {
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
            <li className="text-gray-900">{kategoria.nazwa}</li>
          </ol>
        </nav>

        {/* Header kategorii */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            {kategoria.nazwa.toUpperCase()}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {kategoria.opis}
          </p>
          <div className="text-sm text-gray-500">
            {kategoria.produkty} produktów w tej kategorii
          </div>
        </div>

        {/* Podkategorie - jeśli istnieją */}
        {kategoria.podkategorie.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
              Podkategorie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {kategoria.podkategorie.map((podkat) => (
                <Link 
                  key={podkat.slug}
                  href={`/kategorie/${params.kategoria}/${podkat.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 p-8 rounded-lg text-center hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                      {podkat.nazwa}
                    </h3>
                    <span className="text-sm text-gray-500 group-hover:text-gray-600">
                      Zobacz produkty →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Siatka produktów */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light text-gray-900">
              Wszystkie produkty
            </h2>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option>Sortuj: Najnowsze</option>
                <option>Cena: od najniższej</option>
                <option>Cena: od najwyższej</option>
                <option>Nazwa: A-Z</option>
              </select>
            </div>
          </div>

          {/* Produkty */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4,5,6,7,8].map((item) => (
              <Link 
                key={item}
                href={`/produkt/${item}`}
                className="group"
              >
                <div className="bg-white">
                  <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square rounded-lg">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl text-gray-400">
                        {params.kategoria === 'torebki' ? '👜' : 
                         params.kategoria === 'portfele' ? '👛' :
                         params.kategoria === 'paski' ? '👔' :
                         params.kategoria === 'teczki' ? '💼' :
                         params.kategoria === 'walizki' ? '🧳' :
                         params.kategoria === 'plecaki' ? '🎒' :
                         params.kategoria === 'akcesoria' ? '🔑' :
                         params.kategoria === 'torby-podrozne' ? '🛍️' : '💎'}
                      </span>
                    </div>
                    {item <= 2 && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-medium rounded">
                        SALE
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <button className="bg-white text-black px-4 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                        ZOBACZ PRODUKT
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-1">
                    {kategoria.nazwa.slice(0, -1)} Ever #{item}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">Skóra naturalna</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-semibold">
                      {Math.floor(Math.random() * 300) + 100} zł
                    </span>
                    {item <= 2 && (
                      <span className="text-gray-400 line-through text-sm">
                        {Math.floor(Math.random() * 200) + 200} zł
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors font-medium">
              ZAŁADUJ WIĘCEJ PRODUKTÓW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
// src/app/produkty/page.js
export default function StronaProdukty() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            WSZYSTKIE PRODUKTY
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Odkryj pełną kolekcję galanterii skórzanej Ever. 
            Każdy produkt to gwarancja najwyższej jakości i stylu.
          </p>
        </div>

        {/* Filtry */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button className="px-6 py-2 bg-black text-white rounded-full">
            Wszystkie
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
            Torebki
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
            Portfele
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
            Paski
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
            Teczki
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
            Walizki
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
            Plecaki
          </button>
        </div>

        {/* Siatka produktów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Przykładowe produkty - później zastąpimy danymi z Firebase */}
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square">
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-medium">
                  SALE
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">
                    {item % 4 === 0 ? '👜' : item % 3 === 0 ? '👛' : item % 2 === 0 ? '👔' : '💼'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ZOBACZ PRODUKT
                  </button>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2">
                Produkt galanterii skórzanej #{item}
              </h3>
              <p className="text-gray-600 text-sm mb-2">Kategoria produktu</p>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">
                  {Math.floor(Math.random() * 400) + 100} zł
                </span>
                {item % 3 === 0 && (
                  <span className="text-gray-400 line-through text-sm">
                    {Math.floor(Math.random() * 200) + 300} zł
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-16">
          <button className="border-2 border-black text-black px-8 py-3 font-medium hover:bg-black hover:text-white transition-colors">
            ZAŁADUJ WIĘCEJ PRODUKTÓW
          </button>
        </div>
      </div>
    </div>
  )
}
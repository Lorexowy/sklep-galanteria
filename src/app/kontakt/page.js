// src/app/kontakt/page.js
export default function StronaKontaktu() {
  // URL do udostępniania (później będzie dynamiczny)
  const urlStrony = "https://sklepever.pl"
  const tytulStrony = "Ever - Galanteria Skórzana"
  const opisStrony = "Odkryj najwyższej jakości galanterię skórzaną Made in Poland"

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            KONTAKT
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Masz pytania? Potrzebujesz pomocy? 
            Skontaktuj się z nami bezpośrednio!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Lewa strona - Informacje kontaktowe */}
          <div className="space-y-8">
            
            {/* Dane kontaktowe */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Skontaktuj się z nami
              </h2>
              
              <div className="space-y-6">
                {/* Telefon */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <a 
                      href="tel:+48123456789" 
                      className="text-gray-700 font-medium hover:text-gray-900 transition-colors text-lg"
                    >
                      +48 123 456 789
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Pn-Pt: 9:00-18:00, Sb: 10:00-16:00</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                    <a 
                      href="mailto:kontakt@ever.pl" 
                      className="text-gray-700 font-medium hover:text-gray-900 transition-colors text-lg"
                    >
                      kontakt@ever.pl
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Odpowiadamy w ciągu 24h</p>
                  </div>
                </div>

                {/* Adres */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                    <address className="text-gray-700 font-medium not-italic">
                      ul. Skórzana 12<br />
                      00-001 Warszawa<br />
                      Polska
                    </address>
                  </div>
                </div>

                {/* Godziny pracy */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl">
                    🕒
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Godziny pracy</h3>
                    <div className="text-gray-700 font-medium">
                      <p>Poniedziałek - Piątek: 9:00 - 18:00</p>
                      <p>Sobota: 10:00 - 16:00</p>
                      <p className="text-gray-600">Niedziela: zamknięte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metody płatności */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Akceptowane płatności
              </h2>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <div className="w-full h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                </div>
                <div className="bg-red-100 rounded-lg p-4 text-center">
                  <div className="w-full h-8 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    MASTERCARD
                  </div>
                </div>
                <div className="bg-orange-100 rounded-lg p-4 text-center">
                  <div className="w-full h-8 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    BLIK
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <div className="w-full h-8 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    P24
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prawa strona */}
          <div className="space-y-8">
            
            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Często zadawane pytania
              </h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Ile kosztuje dostawa?</h3>
                  <p className="text-gray-600">Darmowa dostawa od 150 zł, poniżej tej kwoty koszt dostawy wynosi 15 zł.</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Jak długo trwa dostawa?</h3>
                  <p className="text-gray-600">Standardowo 1-3 dni robocze w całej Polsce. Wysyłamy produkty w ciągu 24h od złożenia zamówienia.</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Czy mogę zwrócić produkt?</h3>
                  <p className="text-gray-600">Tak, masz 30 dni na zwrot produktu bez podania przyczyny. Zwrot jest darmowy.</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Jak dbać o produkty skórzane?</h3>
                  <p className="text-gray-600">Do każdego produktu dołączamy instrukcję pielęgnacji. Polecamy także nasze specjalne środki do konserwacji skóry.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Czy oferujecie gwarancję?</h3>
                  <p className="text-gray-600">Tak, wszystkie nasze produkty objęte są 2-letnią gwarancją na wady produkcyjne.</p>
                </div>
              </div>
            </div>

            {/* Udostępnianie */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Udostępnij:
              </h2>
              
              <p className="text-gray-600 mb-6">
                Podoba Ci się nasza oferta? Podziel się nią ze znajomymi!
              </p>
              
              <div className="flex space-x-4">
                {/* Facebook */}
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlStrony)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors font-bold"
                  title="Udostępnij na Facebooku"
                >
                  f
                </a>
                
                {/* Twitter */}
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlStrony)}&text=${encodeURIComponent(tytulStrony + ' - ' + opisStrony)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors font-bold"
                  title="Udostępnij na X (Twitter)"
                >
                  𝕏
                </a>
                
                {/* LinkedIn */}
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlStrony)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors font-bold"
                  title="Udostępnij na LinkedIn"
                >
                  in
                </a>
                
                {/* WhatsApp */}
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(tytulStrony + ' - ' + opisStrony + ' ' + urlStrony)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors text-lg"
                  title="Udostępnij przez WhatsApp"
                >
                  💬
                </a>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Dziękujemy za polecanie nas znajomym!
              </p>
            </div>

            {/* Dodatkowe informacje */}
            <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                🇵🇱 Made in Poland
              </h2>
              <p className="text-gray-300">
                Wszystkie nasze produkty są wykonywane przez polskich rzemieślników 
                z najwyższej jakości materiałów. Wspieramy lokalną produkcję i tradycyjne rzemiosło.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
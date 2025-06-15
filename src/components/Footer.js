// src/components/Footer.js
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* O firmie */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ever</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tworzymy galanterię skórzaną najwyższej jakości, łącząc tradycyjne rzemiosło z nowoczesnym designem. Każdy produkt to gwarancja stylu i trwałości.
              </p>
              <h4 className="text-1xl font-bold text-gray-900 mb-3">Udostępnij nas:</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  f
                </a>
                <a href="#" className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  ig
                </a>
                <a href="#" className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  in
                </a>
              </div>
            </div>

            {/* Produkty */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider">Produkty</h4>
              <ul className="space-y-3">
                <li><Link href="/kategorie/portfele" className="text-gray-600 hover:text-gray-900 transition-colors">Portfele damskie</Link></li>
                <li><Link href="/kategorie/portfele" className="text-gray-600 hover:text-gray-900 transition-colors">Portfele męskie</Link></li>
                <li><Link href="/kategorie/torebki" className="text-gray-600 hover:text-gray-900 transition-colors">Torebki</Link></li>
                <li><Link href="/kategorie/paski" className="text-gray-600 hover:text-gray-900 transition-colors">Paski skórzane</Link></li>
                <li><Link href="/kategorie/akcesoria" className="text-gray-600 hover:text-gray-900 transition-colors">Akcesoria</Link></li>
                <li><Link href="/produkty" className="text-gray-600 hover:text-gray-900 transition-colors">Wszystkie produkty</Link></li>
              </ul>
            </div>

            {/* Obsługa klienta */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider">Obsługa</h4>
              <ul className="space-y-3">
                <li><Link href="/kontakt" className="text-gray-600 hover:text-gray-900 transition-colors">Kontakt</Link></li>
                <li><Link href="/dostawa" className="text-gray-600 hover:text-gray-900 transition-colors">Dostawa i płatność</Link></li>
                <li><Link href="/zwroty" className="text-gray-600 hover:text-gray-900 transition-colors">Zwroty i reklamacje</Link></li>
                <li><Link href="/regulamin" className="text-gray-600 hover:text-gray-900 transition-colors">Regulamin</Link></li>
                <li><Link href="/polityka-prywatnosci" className="text-gray-600 hover:text-gray-900 transition-colors">Polityka prywatności</Link></li>
                <li><Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider">Kontakt</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Telefon:</p>
                  <a href="tel:+48123456789" className="text-gray-900 font-medium hover:text-gray-700">
                    +48 123 456 789
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Email:</p>
                  <a href="mailto:kontakt@ever.pl" className="text-gray-900 font-medium hover:text-gray-700">
                    kontakt@ever.pl
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Godziny pracy:</p>
                  <p className="text-gray-900">Pn-Pt: 9:00-18:00</p>
                  <p className="text-gray-900">Sb: 10:00-16:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © 2025 Ever - Galanteria Skórzana. Wszelkie prawa zastrzeżone.
            </div>

            {/* Payment methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm mr-2">Płatności:</span>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-10 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-10 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  BLIK
                </div>
                <div className="w-10 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  P24
                </div>
              </div>
            </div>

            {/* Made in Poland */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🇵🇱</span>
              <span className="text-gray-600 text-sm font-medium">Made in Poland</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
// src/lib/seedData.js
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

// Przykładowe produkty
const produktyStartowe = [
  {
    id: 'torebka-milano-1',
    nazwa: 'Elegancka torebka skórzana Milano',
    kategoria: 'torebki',
    podkategoria: 'na-ramie', 
    cena: 299,
    cenaPrzed: 399,
    opis: 'Ekskluzywna torebka wykonana z najwyższej jakości skóry naturalnej. Idealny dodatek do eleganckich stylizacji.',
    szczegoly: [
      'Materiał: 100% skóra naturalna',
      'Wymiary: 30 x 25 x 12 cm', 
      'Kolor: Czarny',
      'Podszewka: Tkanina bawełniana'
    ],
    dostepnosc: 'dostepny',
    stockIlosc: 8,
    zdjecia: ['/images/produkty/torebka-milano-1.jpg'],
    stworzono: new Date(),
    aktywny: true
  },
  {
    id: 'portfel-vienna-1',
    nazwa: 'Klasyczny portfel męski Vienna',
    kategoria: 'portfele',
    podkategoria: 'meskie',
    cena: 149,
    cenaPrzed: null,
    opis: 'Stylowy portfel męski z prawdziwej skóry. Kompaktowy design z miejscem na karty i banknoty.',
    szczegoly: [
      'Materiał: Skóra naturalna',
      'Wymiary: 11 x 9 x 2 cm',
      'Kolor: Brązowy', 
      'Miejsca na karty: 8'
    ],
    dostepnosc: 'dostepny',
    stockIlosc: 15,
    zdjecia: ['/images/produkty/portfel-vienna-1.jpg'],
    stworzono: new Date(),
    aktywny: true
  },
  {
    id: 'pasek-classic-1',
    nazwa: 'Pasek skórzany Classic',
    kategoria: 'paski',
    podkategoria: 'meskie',
    cena: 89,
    cenaPrzed: null,
    opis: 'Klasyczny pasek męski ze skóry naturalnej. Elegancka metalowa klamra.',
    szczegoly: [
      'Materiał: Skóra naturalna',
      'Szerokość: 3.5 cm',
      'Dostępne rozmiary: 90-110 cm',
      'Klamra: Metal antyczny'
    ],
    dostepnosc: 'maly_stock',
    stockIlosc: 3,
    zdjecia: ['/images/produkty/pasek-classic-1.jpg'],
    stworzono: new Date(),
    aktywny: true
  }
]

// Funkcja do dodania produktów
export const dodajProduktyStartowe = async () => {
  try {
    console.log('🔄 Dodawanie produktów do bazy...')
    
    for (const produkt of produktyStartowe) {
      await setDoc(doc(db, 'produkty', produkt.id), produkt)
      console.log(`✅ Dodano: ${produkt.nazwa}`)
    }
    
    console.log('🎉 Wszystkie produkty dodane!')
    return true
  } catch (error) {
    console.error('❌ Błąd dodawania produktów:', error)
    return false
  }
}
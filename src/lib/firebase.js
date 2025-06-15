// src/lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TWOJE AKTUALNE DANE
const firebaseConfig = {
  apiKey: "AIzaSyB1cYnG6hO4w9ngDJTohDiQHBZj4emZ_TE",
  authDomain: "ever-sklep.firebaseapp.com",
  projectId: "ever-sklep",
  storageBucket: "ever-sklep.firebasestorage.app",
  messagingSenderId: "372825823546",
  appId: "1:372825823546:web:29b48180e6719f4d825803",
  measurementId: "G-MLBM5REGWL"
}

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig)

// Eksport usług
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app
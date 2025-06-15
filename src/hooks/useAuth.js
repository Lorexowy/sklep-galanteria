// src/hooks/useAuth.js
'use client'
import { useState, useEffect, createContext, useContext } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log('✅ Użytkownik zalogowany:', user.email)
          
          // Pobierz dodatkowe dane użytkownika z Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          const userData = userDoc.exists() ? userDoc.data() : {}
          
          setUser({
            ...user,
            ...userData
          })
        } else {
          console.log('👤 Brak zalogowanego użytkownika')
          setUser(null)
        }
      } catch (error) {
        console.error('❌ Błąd pobierania danych użytkownika:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  // Rejestracja
  const signup = async (email, haslo, imie, nazwisko) => {
    try {
      console.log('🔄 Rozpoczynam rejestrację dla:', email)
      
      const result = await createUserWithEmailAndPassword(auth, email, haslo)
      console.log('✅ Użytkownik utworzony w Firebase Auth:', result.user.uid)
      
      // Dodaj imię i nazwisko do profilu Firebase Auth
      await updateProfile(result.user, {
        displayName: `${imie} ${nazwisko}`
      })
      console.log('✅ Profil Firebase Auth zaktualizowany')
      
      // ZAPISZ DANE DO FIRESTORE
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        imie: imie,
        nazwisko: nazwisko,
        displayName: `${imie} ${nazwisko}`,
        createdAt: new Date(),
        role: 'customer' // lub 'admin' dla administratorów
      }
      
      await setDoc(doc(db, 'users', result.user.uid), userData)
      console.log('✅ Dane użytkownika zapisane do Firestore:', userData)
      
      return { success: true, user: result.user }
    } catch (error) {
      console.error('❌ Błąd rejestracji:', error)
      
      let errorMessage = 'Wystąpił błąd podczas rejestracji'
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Ten adres email jest już zarejestrowany'
          break
        case 'auth/weak-password':
          errorMessage = 'Hasło jest za słabe - minimum 6 znaków'
          break
        case 'auth/invalid-email':
          errorMessage = 'Nieprawidłowy format adresu email'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Rejestracja emailem jest wyłączona'
          break
        default:
          errorMessage = `Błąd: ${error.message}`
      }
      
      return { success: false, error: errorMessage }
    }
  }

  // Logowanie
  const login = async (email, haslo) => {
    try {
      console.log('🔄 Próba logowania dla:', email)
      
      const result = await signInWithEmailAndPassword(auth, email, haslo)
      console.log('✅ Użytkownik zalogowany:', result.user.email)
      
      return { success: true, user: result.user }
    } catch (error) {
      console.error('❌ Błąd logowania:', error)
      
      let errorMessage = 'Nieprawidłowy email lub hasło'
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Nie znaleziono użytkownika z tym adresem email'
          break
        case 'auth/wrong-password':
          errorMessage = 'Nieprawidłowe hasło'
          break
        case 'auth/invalid-email':
          errorMessage = 'Nieprawidłowy format adresu email'
          break
        case 'auth/invalid-credential':
          errorMessage = 'Nieprawidłowe dane logowania. Sprawdź email i hasło.'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Zbyt wiele prób logowania. Spróbuj ponownie później.'
          break
        case 'auth/user-disabled':
          errorMessage = 'To konto zostało zablokowane'
          break
        default:
          errorMessage = 'Błąd logowania. Spróbuj ponownie.'
      }
      
      return { success: false, error: errorMessage }
    }
  }

  // Wylogowanie
  const logout = async () => {
    try {
      await signOut(auth)
      console.log('✅ Użytkownik wylogowany')
      setUser(null)
      return { success: true }
    } catch (error) {
      console.error('❌ Błąd wylogowania:', error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
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
      if (user) {
        // Pobierz dodatkowe dane użytkownika z Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.exists() ? userDoc.data() : {}
        
        setUser({
          ...user,
          ...userData
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Rejestracja
  const signup = async (email, haslo, imie, nazwisko) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, haslo)
      
      // Dodaj imię i nazwisko do profilu Firebase Auth
      await updateProfile(result.user, {
        displayName: `${imie} ${nazwisko}`
      })
      
      // ZAPISZ DANE DO FIRESTORE
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        imie: imie,
        nazwisko: nazwisko,
        displayName: `${imie} ${nazwisko}`,
        createdAt: new Date(),
        role: 'customer' // lub 'admin' dla administratorów
      })
      
      console.log('✅ Użytkownik zarejestrowany i zapisany do bazy:', result.user.email)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('❌ Błąd rejestracji:', error)
      return { success: false, error: error.message }
    }
  }

  // Logowanie
  const login = async (email, haslo) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, haslo)
      console.log('✅ Użytkownik zalogowany:', result.user.email)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('❌ Błąd logowania:', error)
      return { success: false, error: error.message }
    }
  }

  // Wylogowanie
  const logout = async () => {
    try {
      await signOut(auth)
      console.log('✅ Użytkownik wylogowany')
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
      {children}
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
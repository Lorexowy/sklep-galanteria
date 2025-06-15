// src/hooks/useProdukty.js
'use client'
import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useProdukty = () => {
  const [produkty, setProdukty] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const pobierzProdukty = async () => {
      try {
        console.log('📦 Pobieranie produktów z bazy...')
        
        const q = query(
          collection(db, 'produkty'), 
          orderBy('stworzono', 'desc')
        )
        
        const querySnapshot = await getDocs(q)
        const produktyData = []
        
        querySnapshot.forEach((doc) => {
          produktyData.push({
            id: doc.id,
            ...doc.data()
          })
        })
        
        console.log('✅ Pobrano produkty:', produktyData.length)
        setProdukty(produktyData)
      } catch (err) {
        console.error('❌ Błąd pobierania produktów:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    pobierzProdukty()
  }, [])

  return { produkty, loading, error }
}
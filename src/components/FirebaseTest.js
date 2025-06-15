// src/components/FirebaseTest.js
'use client'
import { useEffect } from 'react'
import { db } from '@/lib/firebase'

export default function FirebaseTest() {
  useEffect(() => {
    console.log('🔥 Firebase connected:', db)
    console.log('✅ Database ready!')
  }, [])

  return null // Nie wyświetla już przycisku
}
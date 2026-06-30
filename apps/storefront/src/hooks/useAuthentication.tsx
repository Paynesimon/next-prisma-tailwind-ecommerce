'use client'

import { validateBoolean } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function useAuthenticated() {
   const [authenticated, setAuthenticated] = useState(null)

   useEffect(() => {
      try {
         if (typeof window === 'undefined') return

         const match = document.cookie
            .split(';')
            .map((c) => c.trim())
            .find((cookie) => cookie.startsWith('logged-in='))

         const loggedIn = match?.split('=')[1]?.trim() === 'true'
         setAuthenticated(loggedIn)
      } catch (error) {
         console.error({ error })
         setAuthenticated(false)
      }
   }, [])

   return { authenticated: validateBoolean(authenticated, true) }
}

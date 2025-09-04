'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') || '/admin/venue'

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.replace(next)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace(next)
    })
    return () => subscription.unsubscribe()
  }, [next, router])

  async function signIn() {
    const emailRedirectTo = `${window.location.origin}/login?next=${encodeURIComponent(next)}`
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo }
    })
    if (error) alert(error.message)
    else setSent(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4">Sign in</h1>
        {sent ? (
          <p className="text-gray-300">Magic link sent! Check your email.</p>
        ) : (
          <div className="flex gap-3">
            <input
              className="flex-1 px-3 py-2 rounded text-black"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="px-3 py-2 bg-white text-black rounded" onClick={signIn}>
              Send link
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
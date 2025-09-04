'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Magic link sent! Check your email.')
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Sign in</h1>
        <input
          className="px-3 py-2 rounded text-black"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="ml-3 px-3 py-2 bg-white text-black rounded" onClick={signIn}>
          Send magic link
        </button>
      </div>
    </main>
  )
}
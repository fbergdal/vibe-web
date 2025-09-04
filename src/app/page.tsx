import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Image 
        src="/vibe_logo.png" 
        alt="Vibe Logo" 
        width={400} 
        height={400} 
        className="mb-6"
      />
      <h1 className="text-5xl font-bold mb-4">Join the Vibe!</h1>
      <p className="text-xl text-gray-300">Coming soon...</p>
    </main>
  )
}
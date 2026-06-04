import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center bg-[#0A0603] pt-20">
        <div className="text-center px-4">
          <div className="text-[#D4A843] text-8xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>404</div>
          <h1 className="text-3xl font-bold text-[#F5EDD8] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            Lost in the Desert?
          </h1>
          <p className="text-[#7A6245] mb-8 max-w-sm mx-auto">
            This trail doesn't exist. Let's get you back to the main road.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">Back to Home</Link>
            <Link href="/tours" className="btn-secondary">Browse Tours</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

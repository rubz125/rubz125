import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Gallery } from '@/components/home/Gallery'

export const metadata = {
  title: 'Gallery — Eilat Action Jeep Safari',
  description: 'Photos from our Jeep Safari adventures in the Negev, Eilat Mountains, and beyond.',
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Gallery />
      </main>
      <Footer />
    </>
  )
}

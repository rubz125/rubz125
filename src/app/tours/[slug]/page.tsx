import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TourDetailContent } from '@/components/tours/TourDetailContent'
import { tours, getTourBySlug } from '@/data/tours'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) return {}
  return {
    title: tour.title,
    description: tour.shortDescription,
    openGraph: {
      images: [{ url: tour.image, width: 800, height: 500, alt: tour.title }],
    },
  }
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) notFound()

  return (
    <>
      <Navbar />
      <TourDetailContent tour={tour} />
      <Footer />
    </>
  )
}

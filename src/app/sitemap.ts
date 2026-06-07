import type { MetadataRoute } from 'next'
import { tours } from '@/data/tours'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://eilat-action.com'

  const tourPages = tours.map((t) => ({
    url: `${base}/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/tours`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...tourPages,
  ]
}

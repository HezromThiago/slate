import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { CityPage, readStorage } from '../../utils/admin-storage'

export default function CityLanding() {
  const router = useRouter()
  const { slug } = router.query
  const [city, setCity] = useState<CityPage | null>(null)

  useEffect(() => {
    const items = readStorage<CityPage[]>('cities')
    const fallback = { id: 'default', city: 'Osasco', title: 'Estante de aço em Osasco', slug: 'osasco', seoTitle: 'Estante de aço em Osasco | Promoções', seoDescription: 'Compre estante de aço em Osasco com entrega rápida.', content: 'Linha completa de estantes de aço para comércio e indústria em Osasco.' }
    setCity(items.find(item => item.slug === slug || item.city.toLowerCase() === String(slug)) || (String(slug) === 'osasco' ? fallback : null))
  }, [slug])

  const seoTitle = useMemo(() => city?.seoTitle || city?.title || 'Estante de aço por cidade', [city])

  if (!city) return <main className="container py-4">Cidade não encontrada.</main>

  return <main className="container py-4"><Head><title>{seoTitle}</title><meta name="description" content={city.seoDescription} /></Head><h1>{city.title || `Estante de aço em ${city.city}`}</h1><p>{city.content}</p></main>
}

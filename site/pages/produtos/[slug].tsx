import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Product, readStorage } from '../../utils/admin-storage'

export default function ProductDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const items = readStorage<Product[]>('products')
    setProduct(items.find(item => item.slug === slug || item.id === slug) || null)
  }, [slug])

  if (!product) return <main className="container py-4">Produto não encontrado.</main>

  return <main className="container py-4"><Head><title>{product.seoTitle || product.name}</title><meta name="description" content={product.seoDescription || product.description} /></Head><h1>{product.name}</h1><img src={product.image || 'https://placehold.co/600x400'} alt={product.name} className="img-fluid rounded mb-3" /><p className="h4 text-success">R$ {product.price}</p><p>{product.description}</p></main>
}

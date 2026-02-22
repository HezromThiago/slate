import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Product, readStorage } from '../../utils/admin-storage'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => setProducts(readStorage<Product[]>('products')), [])

  return (
    <main className="container py-4">
      <Head>
        <title>Produtos | Estantes de Aço</title>
        <meta name="description" content="Catálogo de produtos em layout inspirado em marketplace para SEO." />
      </Head>
      <h1>Produtos</h1>
      <div className="row g-3">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <article className="card h-100 shadow-sm">
              <img src={product.image || 'https://placehold.co/600x400'} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h2 className="h5">{product.name}</h2>
                <p className="text-success fw-semibold">R$ {product.price}</p>
                <p>{product.description}</p>
                <Link className="btn btn-warning" href={`/produtos/${product.slug || product.id}`}>Ver produto</Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  )
}

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Testimonial, readStorage } from '../../utils/admin-storage'

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  useEffect(() => setItems(readStorage<Testimonial[]>('testimonials')), [])

  return <main className="container py-4"><Head><title>Depoimentos de clientes</title><meta name="description" content="Veja depoimentos reais de clientes." /></Head><h1>Depoimentos</h1><div className="row g-3">{items.map(item => <div className="col-md-4" key={item.id}><article className="card h-100"><div className="card-body"><h2 className="h5">{item.author}</h2><p className="text-muted">{item.role}</p><p>{'★'.repeat(item.rating)}</p><p>{item.content}</p></div></article></div>)}</div></main>
}

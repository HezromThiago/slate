import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { Testimonial, randomId, readStorage, writeStorage } from '../../utils/admin-storage'

const blank: Testimonial = { id: '', author: '', role: '', rating: 5, content: '' }

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [form, setForm] = useState<Testimonial>(blank)
  useEffect(() => setItems(readStorage<Testimonial[]>('testimonials')), [])

  const save = (event: FormEvent) => {
    event.preventDefault()
    const next = form.id ? items.map(i => (i.id === form.id ? form : i)) : [{ ...form, id: randomId() }, ...items]
    setItems(next)
    writeStorage('testimonials', next)
    setForm(blank)
  }

  return <main className="container py-4"><Head><title>Admin | Depoimentos</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /></Head><h1>Depoimentos</h1><form className="card p-3 mb-3" onSubmit={save}><input className="form-control mb-2" placeholder="Autor" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} /><input className="form-control mb-2" placeholder="Cargo" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /><textarea className="form-control mb-2" placeholder="Depoimento" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /><button className="btn btn-primary">Salvar</button></form><ul className="list-group">{items.map(item => <li className="list-group-item" key={item.id}><strong>{item.author}</strong> - {item.content}<button className="btn btn-sm btn-outline-primary ms-2" onClick={() => setForm(item)}>Editar</button><button className="btn btn-sm btn-outline-danger ms-2" onClick={() => { const next = items.filter(t => t.id !== item.id); setItems(next); writeStorage('testimonials', next) }}>Excluir</button></li>)}</ul></main>
}

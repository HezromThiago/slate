import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container py-5">
      <Head>
        <title>Estantes de Aço | Home</title>
        <meta name="description" content="Compra de estantes de aço com páginas por cidade, produtos e depoimentos." />
      </Head>
      <h1 className="display-5 fw-bold">Estantes de Aço</h1>
      <p className="lead">Site com foco em SEO, catálogo estilo marketplace e administração completa.</p>
      <div className="d-flex gap-2 flex-wrap">
        <Link className="btn btn-primary" href="/produtos">Ver produtos</Link>
        <Link className="btn btn-outline-primary" href="/cidades/osasco">Estante de aço em Osasco</Link>
        <Link className="btn btn-outline-secondary" href="/depoimentos">Depoimentos</Link>
        <Link className="btn btn-dark" href="/admin">Entrar no admin</Link>
      </div>
    </main>
  )
}

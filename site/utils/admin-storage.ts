export type CityPage = {
  id: string
  city: string
  title: string
  slug: string
  seoTitle: string
  seoDescription: string
  content: string
}

export type Product = {
  id: string
  name: string
  slug: string
  price: string
  image: string
  seoTitle: string
  seoDescription: string
  description: string
}

export type Testimonial = {
  id: string
  author: string
  role: string
  rating: number
  content: string
}

export type ScriptSettings = {
  headerScripts: string
  footerScripts: string
}

export type WhatsappSettings = {
  number: string
  message: string
  icon: string
}

export type SiteSettings = {
  siteName: string
  email: string
  address: string
  instagramUrl: string
  facebookUrl: string
  faviconUrl: string
}

const defaults = {
  cities: [] as CityPage[],
  products: [] as Product[],
  testimonials: [] as Testimonial[],
  scripts: {
    headerScripts: '',
    footerScripts: '',
  } as ScriptSettings,
  whatsapp: {
    number: '5511999999999',
    message: 'Olá! Quero saber mais.',
    icon: '💬',
  } as WhatsappSettings,
  settings: {
    siteName: 'Estantes Premium',
    email: 'contato@empresa.com',
    address: 'São Paulo - SP',
    instagramUrl: '',
    facebookUrl: '',
    faviconUrl: '/favicon.ico',
  } as SiteSettings,
}

const key = (name: string) => `slate-admin-${name}`

export function readStorage<T>(name: keyof typeof defaults): T {
  if (typeof window === 'undefined') return defaults[name] as unknown as T
  const raw = window.localStorage.getItem(key(name))
  if (!raw) return defaults[name] as unknown as T
  return JSON.parse(raw) as T
}

export function writeStorage<T>(name: keyof typeof defaults, value: T): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key(name), JSON.stringify(value))
}

export function randomId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export const adminCredential = {
  email: 'hezromthiago@gmail.com',
  password: '6125496c',
}

import Link from 'next/link'

const CATEGORIES = [
  { label: 'Jendela Bulat', href: '/katalog?bentuk=bulat', icon: '○' },
  { label: 'Jendela Lengkung', href: '/katalog?bentuk=lengkung', icon: '⌒' },
  {
    label: 'Setengah Lingkaran',
    href: '/katalog?bentuk=setengah_lingkaran',
    icon: '◡',
  },
  { label: 'Jendela Oval', href: '/katalog?bentuk=oval', icon: '⬭' },
  { label: 'Custom Desain', href: '/penawaran', icon: '✦' },
]

export function CategoryRow() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-14">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Belanja Berdasarkan Bentuk
      </h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="text-center group"
          >
            <div className="w-24 h-24 rounded-full bg-tosca-light group-hover:bg-tosca/20 flex items-center justify-center text-3xl text-tosca mb-2 transition">
              {cat.icon}
            </div>
            <p className="text-sm font-medium">{cat.label}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

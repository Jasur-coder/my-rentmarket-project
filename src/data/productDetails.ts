export type ProductReview = {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  date: string
}

export type ProductDetails = {
  description: string
  reviews: ProductReview[]
}

const RU = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

function formatRuDate(d: Date) {
  return RU.format(d)
}

function categoryLabel(id: number) {
  if (id <= 5) return "велосипед"
  if (id === 6) return "беговая дорожка"
  if (id === 7) return "эллиптический тренажер"
  if (id === 8) return "велотренажер"
  if (id === 9) return "гантели"
  if (id === 10) return "турник"
  if (id === 11) return "скакалка"
  if (id === 12) return "фитнес резинки"
  if (id === 13) return "йога коврик"
  return "PlayStation"
}

const authors = [
  "Yulduzxon",
  "Jasur",
  "Madina",
  "Dilnоза",
  "Sardor",
  "Dilmurod",
  "Nodira",
  "Aziz",
  "Kamola",
  "Sevinch",
] as const

const texts = [
  "Сифати яхши экан. Ходит удобно, ничего лишнего.",
  "Отлично подошло для моих задач. Рекомендую!",
  "Работает без проблем. Удобно пользоваться каждый день.",
  "Хорошее качество и аккуратная сборка. Спасибо!",
  "В целом всё понравилось, но хотелось бы чуть быстрее доставку.",
  "Супер вариант для аренды: чисто, аккуратно, приятно.",
  "Цена соответствует качеству. Буду брать снова.",
] as const

function makeDescription(id: number) {
  const cat = categoryLabel(id)
  const a = authors[id % authors.length]
  return `Проверенный ${cat} для комфортной аренды. Подходит для ежедневного использования и даёт стабильный результат. Отзывов много, потому что качество всегда на уровне — как отмечает ${a}.`
}

function makeReview(id: number, index: 1 | 2) {
  const rating = (((id + index * 2) % 5) + 1) as 1 | 2 | 3 | 4 | 5
  const author = authors[(id + index) % authors.length]
  const text = texts[(id + index) % texts.length]
  // Deterministic date spread
  const base = new Date(2024, 7, 20) // 20 августa 2024
  const d = new Date(base)
  d.setDate(base.getDate() + id + index)
  return {
    id: `r-${id}-${index}`,
    author,
    rating,
    text,
    date: ` ${formatRuDate(d)} `.trim(),
  } satisfies ProductReview
}

export function getProductDetails(id: number): ProductDetails {
  const reviews: ProductReview[] = [makeReview(id, 1), makeReview(id, 2)]

  return {
    description: makeDescription(id),
    reviews,
  }
}


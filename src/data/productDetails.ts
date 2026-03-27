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

export const productDetailsById: Record<number, ProductDetails> = {
  0: {
    description:
      "Лёгкий и надёжный велосипед для города и парка. Удобная посадка и плавный ход делают его отличным выбором для ежедневных поездок.",
    reviews: [
      {
        id: "0-1",
        author: "Алишер",
        rating: 5,
        text: "Отличный велосипед, всё как на фото. Едет мягко, тормоза уверенные.",
        date: "2026-02-11",
      },
    ],
  },
  1: {
    description:
      "Шоссейный велосипед для скорости и длинных дистанций. Лёгкая рама и комфортная геометрия помогают держать темп на асфальте.",
    reviews: [
      {
        id: "1-1",
        author: "Фарход",
        rating: 5,
        text: "Очень быстрый. Для трассы — то, что нужно.",
        date: "2026-02-20",
      },
      {
        id: "1-2",
        author: "Мадина",
        rating: 4,
        text: "В целом супер, привезли вовремя. Хотелось бы чуть мягче сиденье.",
        date: "2026-02-23",
      },
    ],
  },
  2: {
    description:
      "Городской велосипед для комфортных поездок. Отлично подходит для парка, набережной и повседневных маршрутов.",
    reviews: [
      {
        id: "2-1",
        author: "Дилноза",
        rating: 5,
        text: "Очень удобный, кататься приятно. Спасибо!",
        date: "2026-03-01",
      },
    ],
  },
}

export function getProductDetails(id: number): ProductDetails {
  return (
    productDetailsById[id] ?? {
      description:
        "Практичный товар для аренды: надёжный, чистый и готов к использованию. Если нужна помощь с выбором — напишите нам, подберём подходящий вариант.",
      reviews: [
        {
          id: `fallback-${id}`,
          author: "Команда RentMarket",
          rating: 5,
          text: "Товар регулярно обслуживается и проходит проверку перед выдачей.",
          date: "2026-03-01",
        },
      ],
    }
  )
}


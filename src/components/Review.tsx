import { Star } from "lucide-react"
import type { ProductReview } from "@/data/productDetails"

interface ReviewProps {
  reviews: ProductReview[]
  myRating: ProductReview["rating"] | 0
  myText: string
  onChangeRating: (rating: ProductReview["rating"]) => void
  onChangeText: (text: string) => void
  onSubmit: () => void
}

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => {
      const current = i + 1
      const filled = current <= rating
      return (
        <Star
          key={i}
          className="h-4 w-4"
          fill={filled ? "#F59E0B" : "none"}
          stroke={filled ? "#F59E0B" : "#CBD5E1"}
        />
      )
    })}
  </div>
)

const Review = ({
  reviews,
  myRating,
  myText,
  onChangeRating,
  onChangeText,
  onSubmit,
}: ReviewProps) => {
    return (
        <div className="space-y-6">
                            <div className="divide-y divide-gray-200">
                                {reviews.map((r: ProductReview) => (
                                    <div key={r.id} className="py-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {r.author}
                                                </div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <RatingStars rating={r.rating} />
                                                    <div className="text-xs text-gray-500">{r.date}</div>
                                                </div>
                                                <div className="mt-3 text-sm text-gray-600">
                                                    {r.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-2">
                                <div className="text-base font-semibold text-gray-900">Мой отзыв</div>

                                <div className="mt-5">
                                    <div className="text-sm text-gray-500 font-medium">Общая оценка</div>
                                    <div className="mt-3 flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => {
                                            const current = i + 1
                                            const filled = current <= myRating
                                            return (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => onChangeRating(current as ProductReview["rating"])}
                                                    className="rounded-full"
                                                    aria-label={`Оценка ${current} из 5`}
                                                >
                                                    <Star className="h-5 w-5" aria-hidden fill={filled ? "#F59E0B" : "none"} stroke={filled ? "#F59E0B" : "#CBD5E1"} />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <textarea
                                    value={myText}
                                    onChange={(e) => onChangeText(e.target.value)}
                                    placeholder="Напишите отзыв"
                                    className="mt-5 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00D414]"
                                    rows={4}
                                />

                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    disabled={myRating === 0 || myText.trim().length === 0}
                                    className="mt-5 w-full rounded-xl bg-[#3b3b3b] py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
    )
}

export default Review;
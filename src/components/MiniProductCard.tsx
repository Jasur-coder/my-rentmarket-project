import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import type { ProductCardProps } from "@/components/type"
import { useLikes } from "@/context/LikesContext"

type MiniProductCardProps = {
  product: ProductCardProps
  imageSrc: string
}

const MiniProductCard = ({ product, imageSrc }: MiniProductCardProps) => {
  const { toggleLike, isLiked } = useLikes()
  const liked = isLiked(product.id)

  return (
    <div className="rounded-2xl bg-white px-4 pb-4 pt-4 shadow-sm">
      <div className="flex items-start justify-end">
        <button
          type="button"
          onClick={() => toggleLike(product)}
          className="text-gray-900 hover:text-red-500 transition-colors"
          aria-label="like"
        >
          <Heart
            size={18}
            fill={liked ? "red" : "none"}
            stroke={liked ? "red" : "currentColor"}
          />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block">
        <div className="mt-3 flex h-28 items-center justify-center rounded-xl bg-gray-50">
          <img
            src={imageSrc}
            alt={product.title}
            className="max-h-20 max-w-[90%] object-contain"
          />
        </div>

      </Link>
        <div className="mt-4">
          <div className="truncate text-sm font-medium text-gray-900">
            {product.title}
          </div>
          <div className="mt-1 text-xs text-gray-500">{product.price}</div>
        </div>
    </div>
  )
}

export default MiniProductCard


import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import bicycle from "../assets/bicycle.png"
import { useLikes } from "@/context/LikesContext";
import type { ProductCardProps } from "./type";

type MiniCardProps = {
  product: ProductCardProps
  imageSrc: string
}

const MiniCard = ({ product, imageSrc }: MiniCardProps) => {

    const { toggleLike, isLiked } = useLikes()
      const liked = isLiked(product.id)

    return (
        <div className="max-w-56 bg-transparent px-2 py-2">
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
                        src={bicycle}
                        alt={product.title}
                        className="max-h-20 max-w-[90%] object-contain"
                    />
                </div>

                <div className="mt-4">
                    <div className="truncate text-sm font-medium text-gray-900">
                        <h2>Lorem, ipsum dolor.</h2>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">1000</div>
                </div>
            </Link>
        </div>
    )
}

export default MiniCard
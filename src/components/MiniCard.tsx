import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
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
        <div className="max-w-56 px-2 py-2 w-full mt-3">
            <div className="bg-gray-50 rounded-4xl px-3 py-3 relative">
                <button
                    type="button"
                    onClick={() => toggleLike(product)}
                    className="text-gray-900 hover:text-red-500 transition-colors absolute top-3 right-3"
                    aria-label={
                        liked
                            ? `Убрать «${product.title}» из избранного`
                            : `Добавить «${product.title}» в избранное`
                    }
                >
                    <Heart
                        size={18}
                        aria-hidden
                        fill={liked ? "red" : "none"}
                        stroke={liked ? "red" : "currentColor"}
                    />
                </button>
                <Link to={`/product/${product.id}`} className="block">
                    <div className="mt-3 h-36 flex items-center justify-center  ">
                        <img
                            src={imageSrc}
                            alt={product.title}
                            loading="lazy"
                            decoding="async"
                            width={200}
                            height={200}
                            className="max-h-[200px] max-w-[90%] object-contain"
                        />
                    </div>
                </Link>
            </div>
            <div className="mt-4">
                <div className="truncate text-sm font-medium text-gray-900">
                    {product.title}
                </div>
                <div className="mt-1 text-xs text-gray-700">{product.price}</div>
            </div>
        </div>
    )
}

export default MiniCard
import { Heart } from "lucide-react"
import { icons } from "@/assets/icons"
import type { ProductCardProps } from "./type"
import { useLikes } from "@/context/LikesContext"
import { useCards } from "@/context/CardsContext"
import { useState } from "react"
import { Link } from "react-router-dom"


const ProductCard = (props: ProductCardProps) => {

    const { title, img, price, period, deposit, depositPeriod, speed, seat, brake } = props
    const { toggleLike, isLiked } = useLikes()
    const { toggleLike: toggleCard, isCard } = useCards()
    const liked = isLiked(props.id)
    const inCart = isCard(props.id)
    const [animating, setAnimating] = useState(false)

    const handleLike = () => {
        toggleLike(props)
        setAnimating(true)
    }

    const handleRent = () => {
        toggleCard(props)
    }

    return (
        <div className="bg-white rounded-3xl max-w-[19.1875rem] px-5 py-5 mt-8">
            <div className="flex items-center justify-between mb-5">
                <span>{title}</span>
                <button
                    onClick={handleLike}
                    className="cursor-pointer"
                    onAnimationEnd={() => setAnimating(false)}
                >
                    <Heart
                        fill={liked ? "red" : "none"}
                        stroke={liked ? "red" : "currentColor"}
                        className={animating ? "animate-heart-pop" : ""}
                    />
                </button>
            </div>
            <Link to={`/product/${props.id}`}>
            <img src={img} alt="bicycle" />
            </Link>
            <div className="mt-7 flex justify-between items-center">
                <div className="flex flex-col justify-start">
                    <span className="font-semibold text-[1rem]">{price}</span>
                    <span className="text-[0.875rem] font-normal text-[#9C9C9C]">{period}</span>
                </div>
                <div className="flex flex-col justify-start border-l-2 border-[#9C9C9C] pl-10">
                    <span className="font-semibold text-[1rem]">{deposit}</span>
                    <span className="text-[0.875rem] font-normal text-[#9C9C9C]">{depositPeriod}</span>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-around gap-2 bg-[#F5F5F5] rounded-2xl py-3 px-2">
                <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center">
                        <icons.speed />
                    </div>
                    <span className="text-[0.75rem] text-[#666666] font-normal h-7 mt-4">{speed}</span>
                </div>
                <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center">
                        <icons.seat />
                    </div>
                    <span className="text-[0.75rem] text-[#666666] font-normal h-7 mt-4">{seat}</span>
                </div>
                <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center">
                        <icons.brake />
                    </div>
                    <span className="text-[0.75rem] text-[#666666] font-normal h-7 mt-4">{brake}</span>
                </div>
            </div>
            <button
                onClick={handleRent}
                className={`w-full text-white py-3 font-medium rounded-[0.625rem] mt-4 text-[1.125rem] duration-150 ${
                    inCart ? "bg-[#00D414]" : "bg-[#1F1F1F] hover:bg-[#00D414]"
                }`}
            >
                {inCart ? "В корзине" : "Арендовать"}
            </button>
        </div>
    )
}

export default ProductCard

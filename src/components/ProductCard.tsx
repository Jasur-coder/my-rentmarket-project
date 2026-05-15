import { Heart } from "lucide-react"
import { Gauge, Armchair, CircleStop } from "lucide-react"
import type { ProductCardProps } from "./type"
import { useLikes } from "@/context/LikesContext"
import { useCards } from "@/context/CardsContext"
import { useState } from "react"
import { Link } from "react-router-dom"
import bicycle from "@/assets/bicycle.webp"
import bikepath from "@/assets/bikepath.webp"
import ps from "@/assets/PS.webp"
import BG from "@/assets/BG.webp"
import Express from "@/assets/Express.webp"
import bicyclegift from "@/assets/bicyclegift.webp"
import express24 from "@/assets/partners/express24.webp"
import utezkor from "@/assets/partners/Utezkor.webp"
import yandex from "@/assets/partners/yandex.webp"
import ona from "@/assets/partners/ona.webp"
import payme from "@/assets/partners/Payme.webp"
import uzumNasiya from "@/assets/partners/UzumNasiya.webp"
import solfy from "@/assets/partners/Solfy.webp"
import zoodpay from "@/assets/partners/ZoodPay.webp"

const resolveImagePath = (imgPath: string) => {
    if (!imgPath.startsWith('/src/')) return imgPath;
    
    const imageMap = {
        'bicycle.png': bicycle,
        'PS.png': ps,
        'bikepath.png': bikepath,
        'BG.png': BG,
        'Express.png': Express,
        'bicyclegift.png': bicyclegift,
        'express24.png': express24,
        'Utezkor.png': utezkor,
        'yandex.png': yandex,
        'ona.png': ona,
        'Payme.png': payme,
        'UzumNasiya.png': uzumNasiya,
        'Solfy.png': solfy,
        'ZoodPay.png': zoodpay,
    };
    
    const match = Object.keys(imageMap).find(key => imgPath.includes(key));
    return match ? imageMap[match as keyof typeof imageMap] : bicycle;
};

const ProductCard = (props: ProductCardProps) => {
    const { title, img, price, period, deposit, depositPeriod, speed, seat, brake } = props
    const { toggleLike, isLiked } = useLikes()
    const { toggleCard, isCard } = useCards()
    const liked = isLiked(props.id)
    const inCart = isCard(props.id)
    const [animating, setAnimating] = useState(false)
    const [imageError, setImageError] = useState(false)

    // Determine appropriate image based on product title
    const getImageSrc = () => {
        if (imageError) {
            // Fallback to local images based on category
            if (title.toLowerCase().includes('велосипед')) {
                return bicycle
            } else if (title.toLowerCase().includes('play station') || title.toLowerCase().includes('ps')) {
                return ps
            } else {
                return bikepath
            }
        }
        
        // Use API image if available, otherwise use local fallback
        if (img && !img.includes('placeholder')) {
            return resolveImagePath(img)
        }
        
        // Use local images based on category
        if (title.toLowerCase().includes('велосипед')) {
            return bicycle
        } else if (title.toLowerCase().includes('play station') || title.toLowerCase().includes('ps')) {
            return ps
        } else {
            return bikepath
        }
    }

    const handleImageError = () => {
        setImageError(true)
    }

    const handleLike = () => {
        toggleLike(props)
        setAnimating(true)
    }

    const handleRent = () => {
        // If item is being added to cart (not already in cart), remove from favorites
        if (!inCart && liked) {
            toggleLike(props)
        }
        toggleCard(props)
    }

    return (
        <div className="bg-white rounded-3xl max-w-[19.1875rem] px-5 py-5 mt-8">
            <div className="flex items-center justify-between mb-5">
                <span>{title}</span>
                <button
                    type="button"
                    onClick={handleLike}
                    className="cursor-pointer"
                    onAnimationEnd={() => setAnimating(false)}
                    aria-label={liked ? `Убрать «${title}» из избранного` : `Добавить «${title}» в избранное`}
                >
                    <Heart
                        aria-hidden
                        fill={liked ? "red" : "none"}
                        stroke={liked ? "red" : "currentColor"}
                        className={animating ? "animate-heart-pop" : ""}
                    />
                </button>
            </div>
            <Link to={`/product/${props.id}`}>
            <img
                src={getImageSrc()}
                alt={title}
                onError={handleImageError}
                loading="lazy"
                decoding="async"
                width={307}
                height={192}
                className="w-full h-48 object-cover rounded-2xl"
            />
            </Link>
            <div className="mt-7 flex justify-between items-center">
                <div className="flex flex-col justify-start">
                    <span className="font-semibold text-[1rem]">{price}</span>
                    <span className="text-[0.875rem] font-normal text-[#6B6B6B]">{period}</span>
                </div>
                <div className="flex flex-col justify-start border-l-2 border-[#9C9C9C] pl-10">
                    <span className="font-semibold text-[1rem]">{deposit}</span>
                    <span className="text-[0.875rem] font-normal text-[#6B6B6B]">{depositPeriod}</span>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-around gap-2 bg-[#F5F5F5] rounded-2xl py-3 px-2">
                <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center">
                        <Gauge />
                    </div>
                    <span className="text-[0.75rem] text-[#4A4A4A] font-normal h-7 mt-4">{speed}</span>
                </div>
                <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center">
                        <Armchair />
                    </div>
                    <span className="text-[0.75rem] text-[#4A4A4A] font-normal h-7 mt-4">{seat}</span>
                </div>
                <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center">
                        <CircleStop />
                    </div>
                    <span className="text-[0.75rem] text-[#4A4A4A] font-normal h-7 mt-4">{brake}</span>
                </div>
            </div>
            <button
                type="button"
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

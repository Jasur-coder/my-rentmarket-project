import { Heart } from "lucide-react"
import { icons } from "@/assets/icons"
import type { ProductCardProps } from "./type"
import { useLikes } from "@/context/LikesContext"
import { useCards } from "@/context/CardsContext"
import { useState } from "react"
import { Link } from "react-router-dom"
import bicycle from "@/assets/bicycle.png"
import bikepath from "@/assets/bikepath.png"
import ps from "@/assets/PS.png"
import BG from "@/assets/BG.png"
import Express from "@/assets/Express.png"
import bicyclegift from "@/assets/bicyclegift.png"
import express24 from "@/assets/partners/express24.png"
import utezkor from "@/assets/partners/Utezkor.png"
import yandex from "@/assets/partners/yandex.png"
import ona from "@/assets/partners/ona.png"
import payme from "@/assets/partners/Payme.png"
import uzumNasiya from "@/assets/partners/UzumNasiya.png"
import solfy from "@/assets/partners/Solfy.png"
import zoodpay from "@/assets/partners/ZoodPay.png"

const resolveImagePath = (imgPath: string) => {
    if (!imgPath.startsWith('/src/')) {
        return imgPath;
    }
    
    // Map all possible image paths to imported modules
    if (imgPath.includes('bicycle.png')) {
        return bicycle;
    } else if (imgPath.includes('PS.png')) {
        return ps;
    } else if (imgPath.includes('bikepath.png')) {
        return bikepath;
    } else if (imgPath.includes('BG.png')) {
        return BG;
    } else if (imgPath.includes('Express.png')) {
        return Express;
    } else if (imgPath.includes('bicyclegift.png')) {
        return bicyclegift;
    } else if (imgPath.includes('express24.png')) {
        return express24;
    } else if (imgPath.includes('Utezkor.png')) {
        return utezkor;
    } else if (imgPath.includes('yandex.png')) {
        return yandex;
    } else if (imgPath.includes('ona.png')) {
        return ona;
    } else if (imgPath.includes('Payme.png')) {
        return payme;
    } else if (imgPath.includes('UzumNasiya.png')) {
        return uzumNasiya;
    } else if (imgPath.includes('Solfy.png')) {
        return solfy;
    } else if (imgPath.includes('ZoodPay.png')) {
        return zoodpay;
    }
    
    // Fallback to bicycle.png if no match found
    return bicycle;
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
            <img 
                src={getImageSrc()} 
                alt={title}
                onError={handleImageError}
                className="w-full h-48 object-cover rounded-2xl"
            />
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

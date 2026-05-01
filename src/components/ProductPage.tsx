import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { productService } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { Heart, Gift, Star } from "lucide-react"
import { useCards } from "@/context/CardsContext"
import { useLikes } from "@/context/LikesContext"
import ProductSwiper from "./ProductSwiper"
import type { ProductCardProps } from "./type"
import { getProductDetails, type ProductReview } from "../data/productDetails"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import MiniCard from "./MiniCard"
import BlogSection from "./BlogSection"
import { Skeleton } from "./ui/skeleton"
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

type RentPeriod = "week" | "month"
type DetailsTab = "desc" | "reviews"

const parsePrice = (value: string) => {
    const numeric = value.replace(/[^\d]/g, "")
    return numeric ? Number(numeric) : 0
}

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

const getProductImages = (product: ProductCardProps) => {
    const images = product.pictures && product.pictures.length > 0
        ? product.pictures
        : [product.thumbnail || product.img];
    
    return images.map(resolveImagePath);
}

const RatingStars = ({ rating, size = 4 }: { rating: number; size?: 4 | 5 }) => (
    <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
            const current = i + 1
            const filled = current <= rating
            return (
                <Star
                    key={i}
                    className={size === 5 ? "h-5 w-5" : "h-4 w-4"}
                    fill={filled ? "#F59E0B" : "none"}
                    stroke={filled ? "#F59E0B" : "#CBD5E1"}
                />
            )
        })}
    </div>
)


const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const productId = parseInt(id || '0', 10)
    const navigate = useNavigate()
    const [rentPeriod, setRentPeriod] = useState<RentPeriod>("week")
    const [quantity, setQuantity] = useState(1)
    const [detailsTab, setDetailsTab] = useState<DetailsTab>("desc")
    const [myRating, setMyRating] = useState<ProductReview["rating"] | 0>(0)
    const [myText, setMyText] = useState("")
    const [userReviews, setUserReviews] = useState<ProductReview[]>([])

    const { toggleCard, isCard } = useCards()
    const { toggleLike, isLiked } = useLikes()

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productService.getProductById(productId),
        enabled: !isNaN(productId)
    })

    const reviews = useMemo(() => {
        if (!product) return []
        const pid = Number(product.id)
        if (Number.isNaN(pid)) return []
        return [...getProductDetails(pid).reviews, ...userReviews]
    }, [product, userReviews])

    const { data: allProducts = [] } = useQuery({
        queryKey: ["products"],
        queryFn: () => productService.getAllProducts(),
    })

    useEffect(() => {
        if (!product) return
        const pid = Number(product.id)
        if (Number.isNaN(pid)) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMyRating(0)
        setMyText("")
    }, [product])

    const isInCart = product ? isCard(Number(product.id)) : false
    const liked = product ? isLiked(Number(product.id)) : false

    const similar = useMemo(() => {
        if (!product) return []
        const currentId = Number(product.id)
        return allProducts.filter((p) => Number(p.id) !== currentId).slice(0, 12)
    }, [allProducts, product])

    const handleAddToCart = () => {
        if (product) {
            toggleCard(product as ProductCardProps)
        }
    }

    const handleBuyNow = () => {
        if (!product) return

        // Ensure the item is present in the cart.
        // `toggleCard` removes the item if it's already there, so we guard with `isInCart`.
        const item = product as ProductCardProps
        if (!isInCart) {
            toggleCard(item)
        }

        const totalPrice = parsePrice(item.price) * quantity
        const totalOldPrice = parsePrice(item.deposit) * quantity

        navigate("/checkout", {
            state: {
                totalPrice,
                totalOldPrice,
                totalSaving: Math.max(0, totalOldPrice - totalPrice),
                itemCount: 1,
                quantities: { [item.id]: quantity },
            },
        })
    }

    const handleLike = () => {
        if (product) {
            toggleLike(product as ProductCardProps)
        }
    }

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1)
    }

    const handleIncrement = () => {
        setQuantity(prev => prev + 1)
    }

    const handleSubmitReview = () => {
        if (!product) return
        const pid = Number(product.id)
        if (Number.isNaN(pid)) return

        const trimmed = myText.trim()
        if (myRating === 0) return
        if (!trimmed) return

        const now = new Date()
        const date = now.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })

        const newReview: ProductReview = {
            id: `user-${pid}-${Date.now()}`,
            author: "Мой отзыв",
            rating: myRating as ProductReview["rating"],
            text: trimmed,
            date,
        }

        setUserReviews((prev) => [...prev, newReview])
        setMyRating(0)
        setMyText("")
    }

    if (isLoading) {
        return (
            <div className="mt-14 mb-14">
        <div className="flex justify-between items-center">
            <div>
                <Skeleton className="w-lg h-96" />
                <div className="flex justify-start gap-13 items-center mt-6">
                    <Skeleton className="w-16 h-16" />
                    <Skeleton className="w-16 h-16" />
                    <Skeleton className="w-16 h-16" />
                </div>
            </div>
            <div>
                <Skeleton className="w-105 h-125" />
            </div>
        </div>
        <Skeleton className="w-full h-36 mt-16" />
    </div>
        )
    }

    if (error || !product) {
        return (
            <div className="mt-2">
                <div className="flex justify-center items-center py-20">
                    <div className="text-red-500">Товар не найден</div>
                </div>
            </div>
        )
    }

    const details = getProductDetails(Number(product.id))
    const displayedReviews = reviews.length > 0 ? reviews : details.reviews



    return (
        <div className="mt-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/catalog">Все категории</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                    <ProductSwiper
                        thumbnail={product.thumbnail || product.img}
                        images={getProductImages(product as ProductCardProps)}
                    />
                </div>

                <div className="w-full lg:w-105 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 self-start">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm text-gray-600 font-medium">Более 70 заказов</span>
                        <button
                            type="button"
                            onClick={handleLike}
                            className="text-gray-700 hover:text-red-500 transition-colors"
                            aria-label="Добавить в избранное"
                        >
                            <Heart
                                size={22}
                                strokeWidth={1.5}
                                fill={liked ? "red" : "none"}
                                stroke={liked ? "red" : "currentColor"}
                            />
                        </button>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-950 leading-tight mb-8">
                        {product.title}
                    </h1>

                    <div className="mb-8">
                        <span className="block text-sm text-gray-700 font-medium mb-3">Срок аренды:</span>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setRentPeriod('week')}
                                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${rentPeriod === 'week'
                                    ? 'bg-[#3b3b3b] text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Неделя
                            </button>
                            <button
                                onClick={() => setRentPeriod('month')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition ${rentPeriod === 'month'
                                    ? 'bg-[#3b3b3b] text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Месяц
                                <Gift size={16} className="text-green-500" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <span className="block text-sm text-gray-700 font-medium mb-3">Количество:</span>
                        <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5">
                            <button
                                onClick={handleDecrement}
                                disabled={quantity === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-gray-700 disabled:opacity-40 disabled:cursor-default hover:bg-gray-200 transition"
                            >
                                –
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900">
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncrement}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-gray-700 hover:bg-gray-200 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <span className="block text-sm text-gray-700 font-medium mb-2">Цена:</span>
                        <p className="text-2xl font-semibold text-gray-950">
                            {product.price}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-1 h-11 rounded-xl border text-sm font-semibold transition ${isInCart
                                ? 'border-[#00D414] bg-[#00D414]/10 text-[#00A90F]'
                                : 'border-[#00D414] text-gray-900 bg-white hover:bg-[#00D414]/5'
                                }`}
                        >
                            {isInCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                        </button>
                        <button
                            className="flex-1 h-11 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                            type="button"
                            onClick={handleBuyNow}
                        >
                            КУПИТЬ СЕЙЧАС
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10 rounded-2xl bg-white">
                <div className="flex items-center gap-8 border-b border-gray-200 px-6 pt-5">
                    <button
                        type="button"
                        onClick={() => setDetailsTab("desc")}
                        className={`pb-3 text-sm font-medium transition-colors ${detailsTab === "desc"
                            ? "text-[#00A90F] border-b-2 border-[#00D414]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Описание товара
                    </button>
                    <button
                        type="button"
                        onClick={() => setDetailsTab("reviews")}
                        className={`pb-3 text-sm font-medium transition-colors ${detailsTab === "reviews"
                            ? "text-[#00A90F] border-b-2 border-[#00D414]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Отзывы ({displayedReviews.length})
                    </button>
                </div>

                <div className="px-6 pb-6 pt-5">
                    {detailsTab === "desc" ? (
                        <p className="text-sm leading-6 text-gray-700">
                            {details.description}
                        </p>
                    ) : (
                        <div className="space-y-6">
                            <div className="divide-y divide-gray-200">
                                {displayedReviews.map((r: ProductReview) => (
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
                                                    onClick={() => setMyRating(current as ProductReview["rating"])}
                                                    className="rounded-full"
                                                    aria-label={`rate ${current}`}
                                                >
                                                    <Star className="h-5 w-5" fill={filled ? "#F59E0B" : "none"} stroke={filled ? "#F59E0B" : "#CBD5E1"} />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <textarea
                                    value={myText}
                                    onChange={(e) => setMyText(e.target.value)}
                                    placeholder="Напишите отзыв"
                                    className="mt-5 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00D414]"
                                    rows={4}
                                />

                                <button
                                    type="button"
                                    onClick={handleSubmitReview}
                                    disabled={myRating === 0 || myText.trim().length === 0}
                                    className="mt-5 w-full rounded-xl bg-[#3b3b3b] py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {similar.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-900">Похожие товары</h2>
                    <div className="mt-6">
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            spaceBetween={16}
                            slidesPerView={2}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },

                            }}
                            className="swiper-content"
                        >
                            {similar.map((p) => (
                                <SwiperSlide key={p.id} className="swiper-slide-product">
                                    <MiniCard
                                        product={p}
                                        imageSrc={
                                            getProductImages(p as ProductCardProps)[0]
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
            <div className="mt-10">
                <BlogSection title="Полезная информация"/>
            </div>
        </div>
    )
}

export default ProductPage
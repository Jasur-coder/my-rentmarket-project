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
import { useState } from "react"
import { Heart, Gift } from "lucide-react"
import { useCards } from "@/context/CardsContext"
import { useLikes } from "@/context/LikesContext"
import ProductSwiper from "./ProductSwiper"
import type { ProductCardProps } from "./type"
import { getProductDetails, type ProductReview } from "../data/productDetails"


const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const productId = parseInt(id || '0', 10)
    const navigate = useNavigate()
    const [rentPeriod, setRentPeriod] = useState<"week" | "month">("week")
    const [quantity, setQuantity] = useState(1)
    const [detailsTab, setDetailsTab] = useState<"desc" | "reviews">("desc")

    const { toggleCard, isCard } = useCards()
    const { toggleLike, isLiked } = useLikes()

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productService.getProductById(productId),
        enabled: !isNaN(productId)
    })

    const isInCart = product ? isCard(Number(product.id)) : false
    const liked = product ? isLiked(Number(product.id)) : false

    const handleAddToCart = () => {
        if (product) {
            toggleCard(product as ProductCardProps)
        }
    }

    const parsePrice = (value: string) => {
        const numeric = value.replace(/[^\d]/g, "")
        return numeric ? Number(numeric) : 0
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

    const formatPrice = (price: string) => price

    if (isLoading) {
        return (
            <div className="mt-2">
                <div className="flex justify-center items-center py-20">
                    <div className="text-gray-500">Загрузка...</div>
                </div>
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
                        images={product.pictures && product.pictures.length > 0 ? product.pictures : [product.thumbnail || product.img]}
                    />
                </div>

                <div className="w-full lg:w-[420px] bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 self-start">
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
                                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                                    rentPeriod === 'week'
                                        ? 'bg-[#3b3b3b] text-white shadow-md'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Неделя
                            </button>
                            <button
                                onClick={() => setRentPeriod('month')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                                    rentPeriod === 'month'
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
                            {formatPrice(product.price)}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-1 h-11 rounded-xl border text-sm font-semibold transition ${
                                isInCart
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
                        className={`pb-3 text-sm font-medium transition-colors ${
                            detailsTab === "desc"
                                ? "text-[#00A90F] border-b-2 border-[#00D414]"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Описание товара
                    </button>
                    <button
                        type="button"
                        onClick={() => setDetailsTab("reviews")}
                        className={`pb-3 text-sm font-medium transition-colors ${
                            detailsTab === "reviews"
                                ? "text-[#00A90F] border-b-2 border-[#00D414]"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Отзывы ({details.reviews.length})
                    </button>
                </div>

                <div className="px-6 pb-6 pt-5">
                    {detailsTab === "desc" ? (
                        <p className="text-sm leading-6 text-gray-700">
                            {details.description}
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {details.reviews.map((r: ProductReview) => (
                                <div key={r.id} className="rounded-xl border border-gray-200 p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {r.author}
                                            </div>
                                            <div className="text-xs text-gray-500">{r.date}</div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {r.rating}/5
                                        </div>
                                    </div>
                                    <div className="mt-3 text-sm text-gray-700">{r.text}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductPage
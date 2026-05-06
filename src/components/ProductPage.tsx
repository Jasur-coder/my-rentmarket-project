import { productService } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { Gift } from "lucide-react"
import { useCards } from "@/context/CardsContext"
import { useLikes } from "@/context/LikesContext"
import ProductSwiper from "./ProductSwiper"
import type { ProductCardProps } from "./type"
import { getProductDetails, type ProductReview } from "../data/productDetails"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation as SwiperNavigation } from "swiper/modules"
import MiniCard from "./MiniCard"
import BlogSection from "./BlogSection"
import Navigation from "./Navigation"
import bicycle from "@/assets/bicycle.png"
import { imageMap } from "@/data"
import Loading from "./Loading"
import Error from "./Error"
import ProductPageInfo from "./ProductPageInfo"
import Review from "./Review"

type RentPeriod = "week" | "month"
type DetailsTab = "desc" | "reviews"

const parsePrice = (value: string) => {
    const numeric = value.replace(/[^\d]/g, "")
    return numeric ? Number(numeric) : 0
}

const resolveImagePath = (imgPath: string) => {
    if (!imgPath.startsWith('/src/')) return imgPath;
    
    const match = Object.keys(imageMap).find(key => imgPath.includes(key));
    return match ? imageMap[match as keyof typeof imageMap] : bicycle;
};

const getProductImages = (product: ProductCardProps) => {
    const images = product.pictures && product.pictures.length > 0
        ? product.pictures
        : [product.thumbnail || product.img];
    
    return images.map(resolveImagePath);
}

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const productId = parseInt(id || '0', 10)
    const navigate = useNavigate()
    const [state, setState] = useState({
        rentPeriod: 'week' as RentPeriod,
        quantity: 1,
        detailsTab: 'desc' as DetailsTab,
        myRating: 0 as ProductReview["rating"] | 0,
        myText: ''
    })
    const [userReviews, setUserReviews] = useState<ProductReview[]>([])

    const periods = [
        { key: 'week' as RentPeriod, label: 'Неделя' },
        { key: 'month' as RentPeriod, label: 'Месяц', icon: <Gift size={16} className="text-green-500" /> }
    ]

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

    const tabs = [
        { key: 'desc' as DetailsTab, label: 'Описание товара' },
        { key: 'reviews' as DetailsTab, label: `Отзывы (${reviews.length})` }
    ]

    const { data: allProducts = [] } = useQuery({
        queryKey: ["products"],
        queryFn: () => productService.getAllProducts(),
    })

    useEffect(() => {
        if (!product) return
        const pid = Number(product.id)
        if (Number.isNaN(pid)) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(prev => ({ ...prev, myRating: 0, myText: '' }))
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

        const item = product as ProductCardProps
        if (!isInCart) {
            toggleCard(item)
        }

        const totalPrice = parsePrice(item.price) * state.quantity
        const totalOldPrice = parsePrice(item.deposit) * state.quantity

        navigate("/checkout", {
            state: {
                totalPrice,
                totalOldPrice,
                totalSaving: Math.max(0, totalOldPrice - totalPrice),
                itemCount: 1,
                quantities: { [item.id]: state.quantity },
            },
        })
    }

    const handleLike = () => {
        if (product) {
            toggleLike(product as ProductCardProps)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (error || !product) {
        return (
            <Error />
        )
    }

    const details = getProductDetails(Number(product.id))

    return (
        <div className="mt-2">
            <Navigation title={product.title} />
            <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                    <ProductSwiper
                        thumbnail={product.thumbnail || product.img}
                        images={getProductImages(product as ProductCardProps)}
                    />
                </div>

                <ProductPageInfo
                    product={product as ProductCardProps}
                    liked={liked}
                    isInCart={isInCart}
                    periods={periods}
                    rentPeriod={state.rentPeriod}
                    quantity={state.quantity}
                    onSelectPeriod={(period) => setState((prev) => ({ ...prev, rentPeriod: period }))}
                    onDecreaseQuantity={() =>
                        setState((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))
                    }
                    onIncreaseQuantity={() =>
                        setState((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
                    }
                    handleLike={handleLike}
                    handleAddToCart={handleAddToCart}
                    handleBuyNow={handleBuyNow}
                />
            </div>

            <div className="mt-10 rounded-2xl bg-white">
                <div className="flex items-center gap-8 border-b border-gray-200 px-6 pt-5">
                    {tabs.map(({ key, label }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setState(prev => ({ ...prev, detailsTab: key }))}
                            className={`pb-3 text-sm font-medium transition-colors ${state.detailsTab === key
                                ? "text-[#00A90F] border-b-2 border-[#00D414]"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="px-6 pb-6 pt-5">
                    {state.detailsTab === "desc" ? (
                        <p className="text-sm leading-6 text-gray-700">
                            {details.description}
                        </p>
                    ) : (
                        <Review
                            reviews={reviews}
                            myRating={state.myRating}
                            myText={state.myText}
                            onChangeRating={(rating) =>
                                setState((prev) => ({ ...prev, myRating: rating }))
                            }
                            onChangeText={(text) =>
                                setState((prev) => ({ ...prev, myText: text }))
                            }
                            onSubmit={() => {
                                const trimmed = state.myText.trim()
                                if (state.myRating === 0 || !trimmed) return

                                const now = new Date()
                                const date = now.toLocaleDateString("ru-RU", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })

                                const newReview: ProductReview = {
                                    id: `user-${product.id}-${Date.now()}`,
                                    author: "Мой отзыв",
                                    rating: state.myRating as ProductReview["rating"],
                                    text: trimmed,
                                    date,
                                }

                                setUserReviews((prev) => [...prev, newReview])
                                setState((prev) => ({ ...prev, myRating: 0, myText: "" }))
                            }}
                        />
                    )}
                </div>
            </div>
            {similar.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-900">Похожие товары</h2>
                    <div className="mt-6">
                        <Swiper
                            modules={[SwiperNavigation]}
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
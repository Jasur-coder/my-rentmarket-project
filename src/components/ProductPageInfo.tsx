import { Heart } from "lucide-react"
import type { ProductPageInfoProps } from "./type"

const ProductPageInfo = ({
  product,
  liked,
  isInCart,
  periods,
  rentPeriod,
  quantity,
  onSelectPeriod,
  onDecreaseQuantity,
  onIncreaseQuantity,
  handleLike,
  handleAddToCart,
  handleBuyNow,
}: ProductPageInfoProps) => {
    return (
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
                            {periods.map(({ key, label, icon }) => (
                                <button
                                    key={key}
                                    onClick={() => onSelectPeriod(key)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition ${rentPeriod === key
                                        ? 'bg-[#3b3b3b] text-white shadow-md'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {label}
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <span className="block text-sm text-gray-700 font-medium mb-3">Количество:</span>
                        <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5">
                            <button
                                onClick={onDecreaseQuantity}
                                disabled={quantity === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-gray-700 disabled:opacity-40 disabled:cursor-default hover:bg-gray-200 transition"
                            >
                                –
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900">
                                {quantity}
                            </span>
                            <button
                                onClick={onIncreaseQuantity}
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
    )
}

export default ProductPageInfo;
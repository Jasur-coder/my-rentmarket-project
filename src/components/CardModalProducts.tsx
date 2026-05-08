import { Trash2 } from "lucide-react"
import type { CardModalProductsProps } from "./type"

const CardModalProducts = ({
    item,
    qty,
    price,
    oldPrice,
    isSelected,
    onToggleOne,
    onQuantityChange,
    onRemove,
    resolveImagePath,
    formatPrice,
}: CardModalProductsProps) => {
    return (
        <div className="flex items-center justify-between rounded-3xl bg-[#F5F5F5] p-4">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => onToggleOne(item.id)}
                    className="flex items-center justify-center"
                >
                    <span
                        className={`flex h-5 w-5 items-center justify-center rounded border ${isSelected ? "bg-[#00D414] border-[#00D414]" : "border-gray-300 bg-white"
                            }`}
                    >
                        {isSelected && <span className="h-3 w-3 rounded-sm bg-white" />}
                    </span>
                </button>
                <img
                    src={resolveImagePath(item.img)}
                    alt={item.title}
                    className="h-20 w-20 rounded-2xl object-cover bg-white"
                />
                <div className="space-y-2">
                    <p className="text-base font-semibold text-gray-900">{item.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{item.period}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                    <div className="text-base font-semibold text-gray-900">
                        {formatPrice(price * qty)}
                    </div>
                    {oldPrice > price && (
                        <div className="text-xs text-gray-400 line-through">
                            {formatPrice(oldPrice * qty)}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm">
                        <button
                            type="button"
                            onClick={() => onQuantityChange(item.id, -1)}
                            className="px-2 text-lg leading-none text-gray-600"
                        >
                            –
                        </button>
                        <span className="px-3 text-base font-medium text-gray-900">{qty}</span>
                        <button
                            type="button"
                            onClick={() => onQuantityChange(item.id, 1)}
                            className="px-2 text-lg leading-none text-gray-600"
                        >
                            +
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardModalProducts
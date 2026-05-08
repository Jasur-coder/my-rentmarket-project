import { Button } from "@/components/ui/button"
import type { CardModalInfoProps } from "./type"

const CardModalInfo = ({
    itemCount,
    totalPrice,
    totalOldPrice,
    totalSaving,
    canCheckout,
    onCheckout,
    formatPrice,
}: CardModalInfoProps) => {
    return (
        <div className="w-full rounded-3xl bg-[#F5F5F5] p-5 sm:w-80">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Ваш заказ</h3>
            <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                    <span>Товары ({itemCount}):</span>
                    <span>{formatPrice(totalOldPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                    <span>Итого:</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>
                {totalSaving > 0 && (
                    <div className="text-xs font-medium text-[#00D414]">
                        Вы сэкономите: {formatPrice(totalSaving)}
                    </div>
                )}
            </div>
            <Button
                type="button"
                disabled={!canCheckout}
                className="mt-4 h-11 w-full rounded-xl bg-[#1F1F1F] text-base font-medium text-white hover:bg-[#00D414] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200"
                onClick={onCheckout}
            >
                Перейти к оформлению заказа
            </Button>
        </div>
    )
}

export default CardModalInfo
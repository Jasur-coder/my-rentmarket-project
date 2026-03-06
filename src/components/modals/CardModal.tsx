import { useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCards } from "@/context/CardsContext"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface CardModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const CardModal = ({ open, onOpenChange }: CardModalProps) => {
    const { CardItems, toggleLike } = useCards()

    const [quantities, setQuantities] = useState<Record<number, number>>({})
    const [selected, setSelected] = useState<Record<number, boolean>>({})

    useEffect(() => {
        setQuantities((prev) => {
            const next: Record<number, number> = {}
            CardItems.forEach((item) => {
                next[item.id] = prev[item.id] ?? 1
            })
            return next
        })

        setSelected((prev) => {
            const next: Record<number, boolean> = {}
            CardItems.forEach((item) => {
                next[item.id] = prev[item.id] ?? true
            })
            return next
        })
    }, [CardItems])

    const parsePrice = (value: string) => {
        const numeric = value.replace(/[^\d]/g, "")
        return numeric ? Number(numeric) : 0
    }

    const formatPrice = (value: number) =>
        new Intl.NumberFormat("ru-RU").format(value) + " сум"

    const handleToggleAll = () => {
        const allSelected = CardItems.length > 0 && CardItems.every((item) => selected[item.id])
        const next: Record<number, boolean> = {}
        CardItems.forEach((item) => {
            next[item.id] = !allSelected
        })
        setSelected(next)
    }

    const handleToggleOne = (id: number) => {
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const handleQuantityChange = (id: number, delta: number) => {
        setQuantities((prev) => {
            const current = prev[id] ?? 1
            const next = Math.max(1, current + delta)
            return { ...prev, [id]: next }
        })
    }

    const handleRemove = (id: number) => {
        const item = CardItems.find((i) => i.id === id)
        if (item) {
            toggleLike(item)
        }
    }

    const selectedItems = CardItems.filter((item) => selected[item.id])

    const totalPrice = selectedItems.reduce((sum, item) => {
        const qty = quantities[item.id] ?? 1
        return sum + parsePrice(item.price) * qty
    }, 0)

    const totalOldPrice = selectedItems.reduce((sum, item) => {
        const qty = quantities[item.id] ?? 1
        return sum + parsePrice(item.deposit) * qty
    }, 0)

    const totalSaving = Math.max(0, totalOldPrice - totalPrice)

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="container">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl font-bold">Корзина</AlertDialogTitle>
                </AlertDialogHeader>
                {CardItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-3">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>
                            <span className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">0</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">Ваша корзина пуста!</p>
                        <p className="text-sm text-center text-gray-400 max-w-xs">Кажется, вы еще не добавили товары в корзину. Почему бы не начать покупки и наполнить корзину отличными находками?</p>
                    </div>
                ) : (
                    <div className="mt-4 flex flex-col gap-6 sm:flex-row">
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[50vh]">
                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-700">
                                <button
                                    type="button"
                                    onClick={handleToggleAll}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className={`flex h-5 w-5 items-center justify-center rounded border ${CardItems.length > 0 && CardItems.every((item) => selected[item.id]) ? "bg-[#00D414] border-[#00D414]" : "border-gray-300 bg-white"
                                            }`}
                                    >
                                        {CardItems.length > 0 && CardItems.every((item) => selected[item.id]) && (
                                            <span className="h-3 w-3 rounded-sm bg-white" />
                                        )}
                                    </span>
                                    <span className="text-sm">Снять все</span>
                                </button>
                            </div>

                            {CardItems.map((item) => {
                                const qty = quantities[item.id] ?? 1
                                const price = parsePrice(item.price)
                                const oldPrice = parsePrice(item.deposit)

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-3xl bg-[#F5F5F5] p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleOne(item.id)}
                                                className="flex items-center justify-center"
                                            >
                                                <span
                                                    className={`flex h-5 w-5 items-center justify-center rounded border ${selected[item.id] ? "bg-[#00D414] border-[#00D414]" : "border-gray-300 bg-white"
                                                        }`}
                                                >
                                                    {selected[item.id] && (
                                                        <span className="h-3 w-3 rounded-sm bg-white" />
                                                    )}
                                                </span>
                                            </button>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="h-20 w-20 rounded-2xl object-cover bg-white"
                                            />
                                            <div className="space-y-2">
                                                <p className="text-base font-semibold text-gray-900">
                                                    {item.title}
                                                </p>
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
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        className="px-2 text-lg leading-none text-gray-600"
                                                    >
                                                        –
                                                    </button>
                                                    <span className="px-3 text-base font-medium text-gray-900">
                                                        {qty}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                        className="px-2 text-lg leading-none text-gray-600"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="w-full rounded-3xl bg-[#F5F5F5] p-5 sm:w-80">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Ваш заказ</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex items-center justify-between">
                                    <span>Товары ({CardItems.length}):</span>
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
                            <Button className="mt-4 h-11 w-full rounded-xl bg-[#1F1F1F] text-base font-medium text-white hover:bg-[#00D414]">
                                Перейти к оформлению
                            </Button>
                        </div>
                    </div>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel>Закрыть</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CardModal

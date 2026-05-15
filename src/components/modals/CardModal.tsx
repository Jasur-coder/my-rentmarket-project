import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useCards } from "@/context/CardsContext"
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
import type { CardModalProps } from "../type"
import CardModalInfo from "../CardModalInfo"
import CardModalProducts from "../CardModalProducts"
import CardModalEmpty from "../CardModalEmpty"

const imageMap: Record<string, string> = {
    "bicycle.png": bicycle,
    "PS.png": ps,
    "bikepath.png": bikepath,
    "BG.png": BG,
    "Express.png": Express,
    "bicyclegift.png": bicyclegift,
    "express24.png": express24,
    "Utezkor.png": utezkor,
    "yandex.png": yandex,
    "ona.png": ona,
    "Payme.png": payme,
    "UzumNasiya.png": uzumNasiya,
    "Solfy.png": solfy,
    "ZoodPay.png": zoodpay,
}

const resolveImagePath = (imgPath?: string | null) => {
    if (!imgPath) return bicycle
    if (!imgPath.startsWith("/src/")) return imgPath

    const entry = Object.entries(imageMap).find(([name]) => imgPath.includes(name))
    return entry?.[1] ?? bicycle
}

const CardModal = ({ open, onOpenChange }: CardModalProps) => {
    const navigate = useNavigate()
    const { CardItems, toggleCard } = useCards()

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
            toggleCard(item)
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

    const allItemsSelected =
        CardItems.length > 0 && CardItems.every((item) => selected[item.id])

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="container">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl font-bold">Корзина</AlertDialogTitle>
                </AlertDialogHeader>
                {CardItems.length === 0 ? (
                    <CardModalEmpty />
                ) : (
                    <div className="mt-4 flex flex-col gap-6 sm:flex-row">
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[50vh]">
                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-700">
                                <button
                                    type="button"
                                    onClick={handleToggleAll}
                                    className="flex items-center gap-2"
                                    aria-pressed={allItemsSelected}
                                    aria-label={
                                        allItemsSelected
                                            ? "Снять выбор со всех товаров в корзине"
                                            : "Выбрать все товары в корзине"
                                    }
                                >
                                    <span
                                        className={`flex h-5 w-5 items-center justify-center rounded border ${allItemsSelected ? "bg-[#00D414] border-[#00D414]" : "border-gray-300 bg-white"
                                            }`}
                                    >
                                        {allItemsSelected && (
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
                                    <CardModalProducts
                                        key={item.id}
                                        item={item}
                                        qty={qty}
                                        price={price}
                                        oldPrice={oldPrice}
                                        isSelected={!!selected[item.id]}
                                        onToggleOne={handleToggleOne}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemove}
                                        resolveImagePath={resolveImagePath}
                                        formatPrice={formatPrice}
                                    />
                                )
                            })}
                        </div>

                        <CardModalInfo
                            itemCount={selectedItems.length}
                            totalPrice={totalPrice}
                            totalOldPrice={totalOldPrice}
                            totalSaving={totalSaving}
                            canCheckout={selectedItems.length > 0}
                            onCheckout={() => {
                                if (selectedItems.length === 0) return
                                onOpenChange(false)
                                navigate("/checkout", {
                                    state: {
                                        totalPrice,
                                        totalOldPrice,
                                        totalSaving,
                                        itemCount: selectedItems.length,
                                        quantities: Object.fromEntries(
                                            selectedItems.map((i) => [i.id, quantities[i.id] ?? 1])
                                        ),
                                    },
                                })
                            }}
                            formatPrice={formatPrice}
                        />
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

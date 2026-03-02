import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { ProductCardProps } from "@/components/type"

interface CardsContextType {
    CardItems: ProductCardProps[]
    toggleLike: (item: ProductCardProps) => void
    isCard: (id: number) => boolean
}

const CardsContext = createContext<CardsContextType | null>(null)

export const CardsProvider = ({ children }: { children: ReactNode }) => {
    const [CardItems, setCardItems] = useState<ProductCardProps[]>(() => {
        try {
            const stored = localStorage.getItem("cardItems")
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("cardItems", JSON.stringify(CardItems))
    }, [CardItems])

    const toggleLike = (item: ProductCardProps) => {
        setCardItems((prev) =>
            prev.some((i) => i.id === item.id)
                ? prev.filter((i) => i.id !== item.id)
                : [...prev, item]
        )
    }

    const isCard = (id: number) => CardItems.some((i) => i.id === id)

    return (
        <CardsContext.Provider value={{ CardItems, toggleLike, isCard }}>
            {children}
        </CardsContext.Provider>
    )
}

export const useCards = () => {
    const ctx = useContext(CardsContext)
    if (!ctx) throw new Error("useCards must be used within CardsProvider")
    return ctx
}

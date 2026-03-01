import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import type { ProductCardProps } from "@/components/type"

interface LikesContextType {
    likedItems: ProductCardProps[]
    toggleLike: (item: ProductCardProps) => void
    isLiked: (id: number) => boolean
}

const LikesContext = createContext<LikesContextType | null>(null)

export const LikesProvider = ({ children }: { children: ReactNode }) => {
    const [likedItems, setLikedItems] = useState<ProductCardProps[]>([])

    const toggleLike = (item: ProductCardProps) => {
        setLikedItems((prev) =>
            prev.some((i) => i.id === item.id)
                ? prev.filter((i) => i.id !== item.id)
                : [...prev, item]
        )
    }

    const isLiked = (id: number) => likedItems.some((i) => i.id === id)

    return (
        <LikesContext.Provider value={{ likedItems, toggleLike, isLiked }}>
            {children}
        </LikesContext.Provider>
    )
}

export const useLikes = () => {
    const ctx = useContext(LikesContext)
    if (!ctx) throw new Error("useLikes must be used within LikesProvider")
    return ctx
}

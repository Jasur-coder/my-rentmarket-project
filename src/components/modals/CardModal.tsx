import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCards } from "@/context/CardsContext"
import ProductCard from "@/components/ProductCard"

interface CardModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const CardModal = ({ open, onOpenChange }: CardModalProps) => {
    const { CardItems } = useCards()

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-6xl min-w-5xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl font-bold">Корзина</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="overflow-y-auto py-2">
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
                        <div className="flex flex-wrap gap-4 justify-start">
                            {CardItems.map((item) => (
                                <div key={item.id} className="border border-gray-200 rounded-3xl [&>div]:mt-0">
                                    <ProductCard {...item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Закрыть</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CardModal

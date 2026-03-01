import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useLikes } from "@/context/LikesContext"
import ProductCard from "@/components/ProductCard"

interface LikeModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const LikeModal = ({ open, onOpenChange }: LikeModalProps) => {
    const { likedItems } = useLikes()

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-5xl w-fit">
                <AlertDialogHeader>
                    <AlertDialogTitle>Избранное</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="overflow-y-auto py-2">
                    {likedItems.length === 0 ? (
                        <p className="text-center text-[#9C9C9C] py-6 w-[19.1875rem]">Нет избранных товаров</p>
                    ) : (
                        <div className="flex flex-wrap gap-4 justify-start">
                            {likedItems.map((item) => (
                                <ProductCard key={item.id} {...item} />
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

export default LikeModal

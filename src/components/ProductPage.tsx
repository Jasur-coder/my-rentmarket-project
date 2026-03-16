import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductSwiper from "./ProductSwiper"
import { productService } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import type { ProductCardProps } from "./type"
import bicycle from "@/assets/bicycle.png"
import bikepath from "@/assets/bikepath.png"
import ps from "@/assets/PS.png"

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const productId = parseInt(id || '0', 10)
    
    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productService.getProductById(productId),
        enabled: !isNaN(productId)
    })

    // Determine appropriate image based on product title
    const getImageSrc = (product: ProductCardProps) => {
        // Use API image if available, otherwise use local fallback
        if (product.img && !product.img.includes('placeholder')) {
            return product.img
        }
        
        // Use local images based on category
        if (product.title.toLowerCase().includes('велосипед')) {
            return bicycle
        } else if (product.title.toLowerCase().includes('play station') || product.title.toLowerCase().includes('ps')) {
            return ps
        } else {
            return bikepath
        }
    }

    if (isLoading) {
        return (
            <div className="mt-2">
                <div className="flex justify-center items-center py-20">
                    <div className="text-gray-500">Загрузка...</div>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="mt-2">
                <div className="flex justify-center items-center py-20">
                    <div className="text-red-500">Товар не найден</div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/catalog">Все категории</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-5 flex items-center justify-between"></div>
        </div>
    )
}

export default ProductPage
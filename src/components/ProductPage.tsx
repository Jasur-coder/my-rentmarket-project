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
            <div className="mt-5 flex items-start justify-between gap-8">
                <div className="flex-1">
                    <ProductSwiper thumbnail={getImageSrc(product)} images={product.pictures || []} />
                </div>
                <div className="flex-1">
                    <div className="mb-4">
                        <span className="text-green-600 text-sm">Более 70 заказов</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Срок аренды:</h3>
                        <div className="flex gap-3">
                            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Неделя</button>
                            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Месяц</button>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Количество:</h3>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">-</button>
                            <input type="number" value="1" className="w-16 text-center border border-gray-300 rounded-lg" readOnly />
                            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">+</button>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Цена:</h3>
                        <p className="text-2xl font-bold">{product.price} сум</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">В КОРЗИНУ</button>
                        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">КУПИТЬ СЕЙЧАС</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ProductPage
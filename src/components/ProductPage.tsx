import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductSwiper from "./ProductSwiper"
import { productCardData } from "@/data"
const ProductPage = () => {
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
                        <BreadcrumbPage>Велосипед 26 A</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-5 flex items-center justify-between">
                <div>
                    <ProductSwiper
                        thumbnail={productCardData[0].img}
                        images={[productCardData[0].img]}
                    />
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ProductPage
import ProductCard from "./ProductCard"
import type { ProductCardProps } from "./type"

const ProductList = (props: { title: string, productData: ProductCardProps[] }) => {
    const { title, productData } = props
    return (
        <div className="mt-8">
            <h2 className="text-4xl font-bold text-[#222222]">{title}</h2>
            <div className="grid grid-cols-3 gap-4">
                {
                productData.map((item: ProductCardProps) => (
                        <ProductCard key={item.id} {...item} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList

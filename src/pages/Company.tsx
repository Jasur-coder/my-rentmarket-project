import MiniCard from "@/components/MiniCard"
import type { ProductCardProps } from "@/components/type"

const dummyProduct: ProductCardProps = {
    id: 1,
    title: "Dummy Product",
    img: "",
    thumbnail: "",
    price: "1000",
    period: "month",
    deposit: "0",
    depositPeriod: "month",
    speed: "10",
    seat: "1",
    brake: "yes"
}

const Company = () => {
    return (
        <div className="container">
            <MiniCard product={dummyProduct} imageSrc="" />
        </div>
    )
}

export default Company
import BannerRecom from "./BannerRecom"
import ProductList from "./ProductList"
import BannerInfo from "./BannerInfo"
import express from "@/assets/Express.png"
import bicycleGift from "@/assets/bicyclegift.png"
import { productCardData, productCardData2, productCardData3 } from "@/data"
import Rent from "./Rent"
import Map from "./Map"
import Partners from "./Partners"
import FAQComponent from "./FAQComponent"
import BlogSection from "./BlogSection"


const Banner = () => {
    return (
        <section>
            <div className="container">
                <BannerRecom />
                <ProductList title="Велосипеды" productData={productCardData} />
                <BannerInfo img={express} />
                <ProductList title="Спортивный тренажеры" productData={productCardData2} />
                <BannerInfo img={bicycleGift} reverse />
                <ProductList title="Гаджеты и другие" productData={productCardData3} />
                <BannerInfo img={express} />
                <Rent />
                <Map />
                <Partners />
                <FAQComponent/>
                <BlogSection />
            </div>
        </section>
    )
}

export default Banner
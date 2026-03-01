import Banner from "@/components/Banner"
import ProductList from "@/components/ProductList"
import BannerInfo from "@/components/BannerInfo"
import express from "@/assets/Express.png"
import bicycleGift from "@/assets/bicyclegift.png"
import { productCardData, productCardData2, productCardData3 } from "@/data"
import Rent from "@/components/Rent"
import Map from "@/components/Map"
import Partners from "@/components/Partners"
import FAQComponent from "@/components/FAQComponent"
import BlogSection from "@/components/BlogSection"



const Home = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <ProductList title="Велосипеды" productData={productCardData} />
        <BannerInfo img={express} />
        <ProductList title="Спортивный тренажеры" productData={productCardData2} />
        <BannerInfo img={bicycleGift} reverse />
        <ProductList title="Гаджеты и другие" productData={productCardData3} />
        <BannerInfo img={express} />
        <Rent />
        <Map />
        <Partners />
        <FAQComponent />
        <BlogSection />

      </div>
    </>
  )
}

export default Home
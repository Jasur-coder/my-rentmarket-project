import Banner from "@/components/Banner"
import ProductList from "@/components/ProductList"
import BannerInfo from "@/components/BannerInfo"
import express from "@/assets/Express.png"
import bicycleGift from "@/assets/bicyclegift.png"
import { productService } from "@/services/api"
import Rent from "@/components/Rent"
import Map from "@/components/Map"
import Partners from "@/components/Partners"
import FAQComponent from "@/components/FAQComponent"
import BlogSection from "@/components/BlogSection"
import { useQuery } from "@tanstack/react-query"
import type { ProductCardProps } from "@/components/type"

const Home = () => {
  const { data: allProducts = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts()
  })

  // Filter products by category
  const bicycles = allProducts.filter(product => 
    product.title.toLowerCase().includes('велосипед')
  )
  const sportEquipment = allProducts.filter(product => 
    product.title.toLowerCase().includes('беговая дорожка') || 
    product.title.toLowerCase().includes('тренажер')
  )
  const gadgets = allProducts.filter(product => 
    !product.title.toLowerCase().includes('велосипед') && 
    !product.title.toLowerCase().includes('беговая дорожка') && 
    !product.title.toLowerCase().includes('тренажер')
  )

  if (isLoading) {
    return (
      <>
        <Banner />
        <div className="container">
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Загрузка...</div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Banner />
        <div className="container">
          <div className="flex justify-center items-center py-20">
            <div className="text-red-500">Ошибка загрузки данных</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Banner />
      <div className="container">
        <ProductList title="Велосипеды" productData={bicycles} />
        <BannerInfo img={express} />
        <ProductList title="Спортивный тренажеры" productData={sportEquipment} />
        <BannerInfo img={bicycleGift} reverse />
        <ProductList title="Гаджеты и другие" productData={gadgets} />
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
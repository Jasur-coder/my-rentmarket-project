import { lazy, Suspense } from "react"
import Banner from "@/components/Banner"
import ProductList from "@/components/ProductList"
import BannerInfo from "@/components/BannerInfo"
import express from "@/assets/Express.webp"
import bicycleGift from "@/assets/bicyclegift.webp"
import { productService } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const Rent = lazy(() => import("@/components/Rent"))
const Map = lazy(() => import("@/components/Map"))
const Partners = lazy(() => import("@/components/Partners"))
const FAQComponent = lazy(() => import("@/components/FAQComponent"))
const BlogSection = lazy(() => import("@/components/BlogSection"))

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
          <Skeleton className="w-52 h-10 mt-8" />
          <div className="grid grid-cols-3 gap-8 mt-4 mb-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[552px] rounded-3xl" />
            ))}
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
        <Suspense fallback={null}>
          <Rent />
          <Map />
          <Partners />
          <FAQComponent />
          <BlogSection title="Блог" />
        </Suspense>
      </div>
    </>
  )
}

export default Home
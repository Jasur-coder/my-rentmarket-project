import { Swiper, SwiperSlide } from "swiper/react";
import MiniCard from "./MiniCard";
import { Navigation as SwiperNavigation } from "swiper/modules";
import type { ProductCardProps } from "./type";

const SimilarProducts = ({ similar }: { similar: ProductCardProps[] }) => {
    const getProductImages = (product: ProductCardProps) => {
        return product.pictures ? product.pictures : [product.img]
    }

    return (
        <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-900">Похожие товары</h2>
                    <div className="mt-6">
                        <Swiper
                            modules={[SwiperNavigation]}
                            navigation
                            spaceBetween={16}
                            slidesPerView={2}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },

                            }}
                            className="swiper-content"
                        >
                            {similar.map((p) => (
                                <SwiperSlide key={p.id} className="swiper-slide-product">
                                    <MiniCard
                                        product={p}
                                        imageSrc={
                                            getProductImages(p as ProductCardProps)[0]
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
    )
}

export default SimilarProducts;
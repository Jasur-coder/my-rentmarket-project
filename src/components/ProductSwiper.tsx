import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface ProductSwiperPropsI {
  thumbnail: string;
  images: string[];
}

const ProductSwiper = ({ thumbnail, images }: ProductSwiperPropsI) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="mt-10">
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={thumbnail} />
          </SwiperSlide>
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper mt-5"
      >
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={images[0]} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
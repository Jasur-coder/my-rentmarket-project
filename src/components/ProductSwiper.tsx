import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import bicycle from "@/assets/bicycle.png";
import bikepath from "@/assets/bikepath.png";
import ps from "@/assets/PS.png";

const resolveImagePath = (imgPath: string) => {
  if (!imgPath.startsWith('/src/')) {
    return imgPath;
  }
  if (imgPath.includes('bicycle.png')) {
    return bicycle;
  } else if (imgPath.includes('PS.png')) {
    return ps;
  } else if (imgPath.includes('bikepath.png')) {
    return bikepath;
  }
  return bicycle;
};



interface ProductSwiperPropsI {
  thumbnail: string;
  images: string[];
}

const ProductSwiper = ({ thumbnail, images }: ProductSwiperPropsI) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const slides = images.length > 0 ? images : [thumbnail];
  const resolvedSlides = slides.map(resolveImagePath);

  return (
    <div className="mt-10">
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {resolvedSlides.map((img, index) => (
          <SwiperSlide key={index}>
            <img 
              src={img} 
              alt={`Product image ${index + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
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
        {resolvedSlides.map((img, index) => (
          <SwiperSlide key={index}>
            <img 
              src={img} 
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-20 object-cover rounded cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
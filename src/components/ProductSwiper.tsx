import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import bicycle from "@/assets/bicycle.webp";
import bikepath from "@/assets/bikepath.webp";
import ps from "@/assets/PS.webp";
import BG from "@/assets/BG.webp";
import Express from "@/assets/Express.webp";
import bicyclegift from "@/assets/bicyclegift.webp";
import express24 from "@/assets/partners/express24.webp";
import utezkor from "@/assets/partners/Utezkor.webp";
import yandex from "@/assets/partners/yandex.webp";
import ona from "@/assets/partners/ona.webp";
import payme from "@/assets/partners/Payme.webp";
import uzumNasiya from "@/assets/partners/UzumNasiya.webp";
import solfy from "@/assets/partners/Solfy.webp";
import zoodpay from "@/assets/partners/ZoodPay.webp";
import type { ProductSwiperPropsI } from "./type";

const resolveImagePath = (imgPath: string) => {
  if (!imgPath.startsWith('/src/')) return imgPath;
  
  const imageMap = {
    'bicycle.png': bicycle,
    'PS.png': ps,
    'bikepath.png': bikepath,
    'BG.png': BG,
    'Express.png': Express,
    'bicyclegift.png': bicyclegift,
    'express24.png': express24,
    'Utezkor.png': utezkor,
    'yandex.png': yandex,
    'ona.png': ona,
    'Payme.png': payme,
    'UzumNasiya.png': uzumNasiya,
    'Solfy.png': solfy,
    'ZoodPay.png': zoodpay,
  };
  
  const match = Object.keys(imageMap).find(key => imgPath.includes(key));
  return match ? imageMap[match as keyof typeof imageMap] : bicycle;
};

const ProductSwiper = ({ thumbnail, images }: ProductSwiperPropsI) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const slides = images.length > 0 ? images : [thumbnail];
  const resolvedSlides = slides.map(resolveImagePath);
  const canLoop = resolvedSlides.length > 1;

  return (
    <div className="mt-10">
      <Swiper
        loop={canLoop}
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
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              width={500}
              height={384}
              className="w-full h-96 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={resolvedSlides.length > 4}
        spaceBetween={10}
        slidesPerView={Math.min(4, resolvedSlides.length)}
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
              loading="lazy"
              decoding="async"
              width={120}
              height={80}
              className="w-full h-20 object-cover rounded cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
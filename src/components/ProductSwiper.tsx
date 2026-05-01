import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import bicycle from "@/assets/bicycle.png";
import bikepath from "@/assets/bikepath.png";
import ps from "@/assets/PS.png";
import BG from "@/assets/BG.png";
import Express from "@/assets/Express.png";
import bicyclegift from "@/assets/bicyclegift.png";
import express24 from "@/assets/partners/express24.png";
import utezkor from "@/assets/partners/Utezkor.png";
import yandex from "@/assets/partners/yandex.png";
import ona from "@/assets/partners/ona.png";
import payme from "@/assets/partners/Payme.png";
import uzumNasiya from "@/assets/partners/UzumNasiya.png";
import solfy from "@/assets/partners/Solfy.png";
import zoodpay from "@/assets/partners/ZoodPay.png";

const resolveImagePath = (imgPath: string) => {
  if (!imgPath.startsWith('/src/')) {
    return imgPath;
  }
  
  // Map all possible image paths to imported modules
  if (imgPath.includes('bicycle.png')) {
    return bicycle;
  } else if (imgPath.includes('PS.png')) {
    return ps;
  } else if (imgPath.includes('bikepath.png')) {
    return bikepath;
  } else if (imgPath.includes('BG.png')) {
    return BG;
  } else if (imgPath.includes('Express.png')) {
    return Express;
  } else if (imgPath.includes('bicyclegift.png')) {
    return bicyclegift;
  } else if (imgPath.includes('express24.png')) {
    return express24;
  } else if (imgPath.includes('Utezkor.png')) {
    return utezkor;
  } else if (imgPath.includes('yandex.png')) {
    return yandex;
  } else if (imgPath.includes('ona.png')) {
    return ona;
  } else if (imgPath.includes('Payme.png')) {
    return payme;
  } else if (imgPath.includes('UzumNasiya.png')) {
    return uzumNasiya;
  } else if (imgPath.includes('Solfy.png')) {
    return solfy;
  } else if (imgPath.includes('ZoodPay.png')) {
    return zoodpay;
  }
  
  // Fallback to bicycle.png if no match found
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
              className="w-full h-20 object-cover rounded cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
import React from 'react';
import { Battery, Bike, Gauge, Sofa } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}

const features: FeatureItem[] = [
  {
    icon: <Battery className="w-6 h-6" />,
    text: 'Заряда батареи хватает на 75км'
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    text: 'Высокая скорость до 50 км/час'
  },
  {
    icon: <Sofa className="w-6 h-6" />,
    text: 'Удобное эргономичное сиденье'
  },
  {
    icon: <Bike className="w-6 h-6" />,
    text: 'Усиленная рама для любых дорог'
  }
];

const BannerInfo: React.FC<{ img: string; reverse?: boolean }> = (props) => {

  const { img, reverse } = props

  return (
    <div className={`relative bg-[#0035A0] rounded-[48px] overflow-hidden flex gap-12 flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[350px] pr-8 py-8 md:px-16 md:py-12 text-white mt-8`}>

      {/* Контентная часть */}
      <div className="flex-1 z-10 flex flex-col justify-between">
        <h2 className="text-3xl font-bold leading-tight mb-8 max-w-xl ">
          Наши байки разработаны для работы в доставке
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-4 group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:bg-white/10">
                {feature.icon}
              </div>
              <p className="text-[1rem] font-semibold ">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Секция с изображением */}
      <div className="flex-1 relative flex items-center justify-center md:justify-end mt-8 md:mt-0 overflow-hidden">
        <img
          src={img}
          alt="Курьер Express24"
          className="w-full h-full object-cover md:absolute md:inset-0 select-none pointer-events-none"
        />
      </div>
    </div>
  );
};

export default BannerInfo;
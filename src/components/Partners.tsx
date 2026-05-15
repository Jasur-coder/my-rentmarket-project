import React from 'react';
import { partners } from "@/data/partners-data"

const Partners: React.FC = () => {
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-8">
          Наши партнеры
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-[24px] h-[160px] flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                width={160}
                height={80}
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-gray-400 font-medium text-center">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
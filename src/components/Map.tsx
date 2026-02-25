import React from 'react';

const Map: React.FC = () => {
  return (
    <section className="w-full py-12 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Заголовок с синим подчеркиванием */}
        <div className="mb-10 inline-block">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] relative">
            Мы находимся по адресу
            <span className="absolute bottom-[-8px] left-0 w-full h-[3px] "></span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Левая часть: Информация */}
          <div className="w-full lg:w-1/2 bg-white rounded-[32px] p-8 md:p-12 shadow-sm">
            <div className="space-y-10">
              
              {/* Адрес и время */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-black">Шоурум и Пункт выдачи</h3>
                <p className="text-[#666] text-lg leading-relaxed">
                  Бешагач, 55/1 Чиланзарский Район,<br />
                  Ташкент, 100066
                </p>
                <div className="mt-4">
                  <p className="text-[#999] text-base mb-1">График Работы:</p>
                  <p className="text-[#666] text-lg font-medium">Пн-Вс 9:00 - 19:00</p>
                </div>
              </div>

              {/* Пешком */}
              <div>
                <h4 className="text-xl font-bold mb-3 text-black">Как добраться пешком</h4>
                <p className="text-[#666] text-lg italic">
                  Находится В 3 Минутах Ходьбы От Magic City Парк.
                </p>
              </div>

              {/* Транспорт */}
              <div>
                <h4 className="text-xl font-bold mb-3 text-black">Как доехать общественным транспортом?</h4>
                <div className="space-y-2">
                  <p className="text-[#666] text-lg">
                    11,13,51,76,100,103,118,196 Автобус.
                  </p>
                  <p className="text-[#666] text-lg">
                    Метро Узбекистанска и Дружбы Народов
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Правая часть: Карта */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-auto min-h-[500px] bg-white rounded-[32px] overflow-hidden shadow-sm p-2">
            <div className="w-full h-full rounded-[28px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.7461494916844!2d69.24357367657924!3d41.30350480117079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b1b594b9101%3A0x600b3707248d601d!2sMagic%20City!5e0!3m2!1sru!2s!4v1708870000000!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
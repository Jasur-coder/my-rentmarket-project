import React from 'react';
import { linksLeft, linksRight } from '@/data/footer-links';
import { Link } from 'react-router-dom';
import footerLogo from "../assets/footer-logo.webp"
import { Facebook, Instagram, MessageCircle, Send, Youtube, Apple, Play } from "lucide-react"

const Footer: React.FC = () => {

  return (
    <footer className="bg-black text-white py-14 px-6 md:px-12 font-sans tracking-tight">
      <div className="max-w-7xl mx-auto">

        {/* Логотип */}
        <div className="mb-14">
          <Link to="/">
            <img
              src={footerLogo}
              alt="RentMarket"
              loading="lazy"
              decoding="async"
              width={140}
              height={40}
            />
          </Link>
        </div>

        {/* Сетка контента */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Блок 1: График и адрес */}
          <div className="space-y-6">
            <div>
              <h4 className="text-gray-500 mb-2">График работы:</h4>
              <p className="text-[15px]">Ежедневно</p>
              <p className="text-[15px]">10:00 - 20:00</p>
            </div>
            <p className="text-[15px] leading-relaxed">
              Бешагач, 55/1 Чиланзарский район,<br />
              Ташкент, 100066
            </p>
            <p className="text-xl font-bold mt-4">+998 71 200 14 41</p>
          </div>

          {/* Блок 2: Ссылки 1 */}
          <nav className="flex flex-col gap-4">
            {linksLeft.map((link) => (
              <a key={link} href="#" className="text-[15px] underline decoration-gray-700 underline-offset-8 hover:text-[#00FF00] hover:decoration-[#00FF00] transition-all">
                {link}
              </a>
            ))}
          </nav>

          {/* Блок 3: Ссылки 2 */}
          <nav className="flex flex-col gap-4">
            {linksRight.map((link) => (
              <a key={link} href="#" className="text-[15px] underline decoration-gray-700 underline-offset-8 hover:text-[#00FF00] hover:decoration-[#00FF00] transition-all">
                {link}
              </a>
            ))}
          </nav>

          {/* Блок 4: Соцсети и сторы */}
          <div className="flex flex-col gap-10">
            {/* Иконки соцсетей */}
            <div className="flex gap-3">
              {[
                { icon: Send, label: "Telegram" },
                { icon: MessageCircle, label: "WhatsApp" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`RentMarket в ${label}`}
                  className="w-10 h-10 bg-[#00FF00] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                >
                  <Icon size={18} aria-hidden />
                </a>
              ))}
            </div>

            {/* Кнопки магазинов */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="flex items-center gap-2 border border-gray-700 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors min-w-[140px]"
                aria-label="Скачать приложение в Google Play"
              >
              <Play size={18} aria-hidden />
                <div className="text-left">
                  <span className="block text-[9px] uppercase text-gray-400">Get it on</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 border border-gray-700 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors min-w-[140px]"
                aria-label="Скачать приложение в App Store"
              >
              <Apple size={18} aria-hidden />
                <div className="text-left">
                  <span className="block text-[9px] uppercase text-gray-400">Download on the</span>
                  <span className="block text-sm font-semibold">App Store</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Футер-инфо */}
        <div className="border-t border-gray-900 pt-8 flex justify-between items-center text-[11px] text-gray-600 uppercase tracking-[0.2em]">
          <span>ООО "GETNOW"</span>
          <span>ИНН: 310169464</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
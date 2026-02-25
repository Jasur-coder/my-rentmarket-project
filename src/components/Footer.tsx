import React from 'react';
import { 
  Send,           // Вместо Telegram
  MessageCircle,  // Вместо WhatsApp
  Facebook, 
  Instagram, 
  Youtube,
  Apple,
  PlayCircle      // Для иконки Google Play
} from 'lucide-react';

const Footer: React.FC = () => {
  const linksLeft = [
    'Велосипеды', 
    'Спортивные тренажеры', 
    'Гаджеты и другие', 
    'Мы заботимся о вас', 
    'Наши партнеры'
  ];

  const linksRight = [
    'Каталог', 
    'Как оформить', 
    'О компании', 
    'Блог', 
    'Вопросы и ответы'
  ];

  return (
    <footer className="bg-black text-white py-14 px-6 md:px-12 font-sans tracking-tight">
      <div className="max-w-7xl mx-auto">
        
        {/* Логотип */}
        <div className="mb-14">
          <a href="/" className="flex items-center text-3xl font-bold italic group">
            <span className="border-2 border-[#00FF00] rounded-full px-4 py-1 not-italic mr-2 group-hover:bg-[#00FF00] group-hover:text-black transition-colors">
              rent
            </span>
            <span className="text-white">market</span>
          </a>
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
                { icon: <Send size={20} />, label: 'TG' },
                { icon: <MessageCircle size={20} />, label: 'WA' },
                { icon: <Facebook size={20} />, label: 'FB' },
                { icon: <Instagram size={20} />, label: 'IG' },
                { icon: <Youtube size={20} />, label: 'YT' },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 bg-[#00FF00] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Кнопки магазинов */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 border border-gray-700 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors min-w-[140px]">
                <PlayCircle size={24} />
                <div className="text-left">
                  <span className="block text-[9px] uppercase text-gray-400">Get it on</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </div>
              </button>
              
              <button className="flex items-center gap-2 border border-gray-700 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors min-w-[140px]">
                <Apple size={24} />
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
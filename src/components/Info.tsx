import React from 'react';
import { Send, Facebook, Youtube } from 'lucide-react';
import { posts } from '@/data';

const Info = () => {
  // Дублируем посты для создания сетки, как на макете
  const topPosts = [...posts, ...posts];
  const bottomPosts = [...posts, ...posts, ...posts];

  // Компонент карточки (используем тот же стиль, что и в BlogSection)
  const PostCard = ({ post }: { post: typeof posts[0] }) => (
    <div className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-lg">
      {/* Изображение */}
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Контент */}
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
        <div className="text-white/70 text-sm mb-3 font-light">
          {post.date} • для чтения {post.readTime}
        </div>
        <h3 className="text-white text-2xl font-bold leading-tight line-clamp-3">
          {post.title}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Верхняя сетка */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPosts.map((post, i) => (
          <PostCard key={`top-${post.id}-${i}`} post={post} />
        ))}
      </div>

      {/* Центральный блок подписки */}
      <div className="text-center my-16">
        <h2 className="text-[28px] md:text-3xl font-bold text-gray-900 mb-3">
          Читайте нас, где удобно
        </h2>
        <p className="text-gray-500 text-[15px] mb-8 max-w-[360px] mx-auto leading-relaxed">
          Подпишитесь на FitSharing в соцсетях и читайте
          новые материалы там, где привыкли
        </p>
        <div className="flex justify-center gap-3">
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <Send size={18} className="-ml-0.5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <Facebook size={18} />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>

      {/* Нижняя сетка */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bottomPosts.map((post, i) => (
          <PostCard key={`bottom-${post.id}-${i}`} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Info;

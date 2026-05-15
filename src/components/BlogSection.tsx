import React from 'react';
import { ArrowRight } from 'lucide-react';
import { posts } from "@/data/blog-posts"
import { Link } from 'react-router-dom';

const BlogSection: React.FC<{ title: string }> = ({ title }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <Link to="/forbusiness" className="flex items-center gap-2 text-gray-900 font-medium hover:opacity-70 transition-opacity">
          Показать все
          <ArrowRight size={20} />
        </Link>
      </div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-lg"
          >
            {/* Изображение */}
            <img
              src={post.imageUrl}
              alt={post.title}
              loading="lazy"
              decoding="async"
              width={600}
              height={450}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Градиентный оверлей для текста */}
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
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
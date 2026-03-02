import React, { useState, useRef, useEffect } from 'react';
import { ListFilter } from 'lucide-react';
import { productCardData, productCardData2, productCardData3 } from '@/data';
import ProductCard from './ProductCard';
import type { ProductCardProps } from './type';

type SortOption = 'popular' | 'new' | 'cheap' | 'expensive'

const SORT_LABELS: Record<SortOption, string> = {
  popular:   'Популярные',
  new:       'Новинки',
  cheap:     'Сначала дешевые',
  expensive: 'Сначала дорогие',
}

const CATEGORIES = [
  'Все',
  'Чистящее оборудование',
  'Велосипеды',
  'Гаджеты',
  'Беговая дорожка',
  'Велотренажер',
  'Спортивные тренажеры',
]

const parsePrice = (price: string) =>
  parseInt(price.replace(/\D/g, ''), 10) || 0

const allItems: ProductCardProps[] = [
  ...productCardData,
  ...productCardData2,
  ...productCardData3,
]

const CatalogList: React.FC = () => {
  const [sort, setSort] = useState<SortOption>('popular')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')

  const [appliedMin, setAppliedMin] = useState('')
  const [appliedMax, setAppliedMax] = useState('')
  const [appliedCategory, setAppliedCategory] = useState('Все')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false)
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setFilterOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSave = () => {
    setAppliedMin(minPrice)
    setAppliedMax(maxPrice)
    setAppliedCategory(selectedCategory)
    setFilterOpen(false)
  }

  const handleReset = () => {
    setMinPrice('')
    setMaxPrice('')
    setSelectedCategory('Все')
    setAppliedMin('')
    setAppliedMax('')
    setAppliedCategory('Все')
  }

  const filteredItems = allItems.filter((item) => {
    const price = parsePrice(item.price)
    const min = appliedMin ? parseInt(appliedMin, 10) : null
    const max = appliedMax ? parseInt(appliedMax, 10) : null
    if (min !== null && price < min) return false
    if (max !== null && price > max) return false
    return true
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'cheap')     return parsePrice(a.price) - parsePrice(b.price)
    if (sort === 'expensive') return parsePrice(b.price) - parsePrice(a.price)
    if (sort === 'new')       return b.id - a.id
    return 0
  })

  return (
    <div className="w-full flex flex-col gap-4 p-4 pb-44">
      <div className="bg-white rounded-[40px] overflow-hidden">
        <div className="flex flex-col items-center justify-center py-8 bg-white">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-1">Каталог</h1>
          <span className="text-[#6b7280] text-lg">({sortedItems.length} Товар)</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-2">
        {/* Filter button */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ListFilter size={20} className="text-gray-700" />
            <span className="text-sm font-medium text-gray-900">Фильтр</span>
          </button>

          {filterOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl z-50 p-5 flex flex-col gap-4">
              {/* Price range */}
              <div>
                <p className="font-bold text-gray-900 mb-3">Диапазон цен</p>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Минимальная цена</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Максимальная цена</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="0"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="font-bold text-gray-900 mb-2">Категории</p>
                <div className="flex flex-col">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="flex items-center justify-between py-2.5 text-sm border-b border-gray-100 last:border-0 hover:bg-gray-50 px-1 rounded transition-colors"
                    >
                      <span className={selectedCategory === cat ? 'font-semibold text-gray-900' : 'text-gray-400'}>
                        {cat}
                      </span>
                      {selectedCategory === cat && <span className="text-gray-900">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-1">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Сброс
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-xl bg-[#1F1F1F] text-white text-sm font-medium hover:bg-black transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sort button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ListFilter size={20} className="text-gray-700" />
            <span className="text-sm font-medium text-gray-900">{SORT_LABELS[sort]}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg z-50 py-2 overflow-hidden">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => { setSort(option); setDropdownOpen(false) }}
                  className="w-full flex items-center justify-between px-5 py-3 text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className={sort === option ? 'font-semibold text-gray-900' : 'text-gray-400'}>
                    {SORT_LABELS[option]}
                  </span>
                  {sort === option && <span className="text-gray-900">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sortedItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-3xl [&>div]:mt-0">
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;

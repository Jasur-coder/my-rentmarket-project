import React, { useState, useRef, useEffect } from 'react';
import { ListFilter } from 'lucide-react';
import ProductCard from './ProductCard';
import { productService } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import type { SortOption } from './type';
import CatalogFilter from './CatalogFilter';


const parsePrice = (price: string) =>
  parseInt(price.replace(/\D/g, ''), 10) || 0

const CatalogList: React.FC = () => {
  const { data: allProducts = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts()
  })

  const [sort] = useState<SortOption>('popular')
  const [filterOpen, setFilterOpen] = useState(false)

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    selectedCategory: 'Все'
  })

  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: '',
    maxPrice: '',
    selectedCategory: 'Все'
  })

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setFilterOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSave = () => {
    setAppliedFilters(filters)
    setFilterOpen(false)
  }

  const handleReset = () => {
    setFilters({ minPrice: '', maxPrice: '', selectedCategory: 'Все' })
    setAppliedFilters({ minPrice: '', maxPrice: '', selectedCategory: 'Все' })
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="flex justify-between items-center mt-20">
          <Skeleton className="h-12 w-28" />
          <Skeleton className="h-12 w-36" />
        </div>
        <div className="grid grid-cols-3 gap-8 mt-4 mb-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[552px]" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex flex-col gap-4 p-4 pb-44">
        <div className="bg-white rounded-[40px] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-8 bg-white">
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-1">Каталог</h1>
            <span className="text-[#6b7280] text-lg">Ошибка загрузки данных</span>
          </div>
        </div>
      </div>
    )
  }

  const filteredItems = allProducts.filter((item) => {
    const price = parsePrice(item.price)
    const min = appliedFilters.minPrice ? parseInt(appliedFilters.minPrice, 10) : null
    const max = appliedFilters.maxPrice ? parseInt(appliedFilters.maxPrice, 10) : null

    if (min !== null && price < min) return false
    if (max !== null && price > max) return false

    const title = item.title.toLowerCase()

    if (appliedFilters.selectedCategory === 'Велосипеды') {
      return title.includes('велосипед')
    }

    if (appliedFilters.selectedCategory === 'Гаджеты') {
      return !title.includes('велосипед')
    }

    if (
      appliedFilters.selectedCategory === 'Беговая дорожка' ||
      appliedFilters.selectedCategory === 'Велотренажер' ||
      appliedFilters.selectedCategory === 'Тренажерное оборудование'
    ) {
      return title.includes('беговая дорожка')
    }

    return true
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'cheap') return parsePrice(a.price) - parsePrice(b.price)
    if (sort === 'expensive') return parsePrice(b.price) - parsePrice(a.price)
    if (sort === 'new') return b.id - a.id
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
            <CatalogFilter
              filters={filters}
              setFilters={setFilters}
              handleReset={handleReset}
              handleSave={handleSave}
            />
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

import { CATEGORIES } from "@/data/categories"
import type { CatalogFilterProps } from "./type"


const CatalogFilter = ({
    filters,
    setFilters,
    handleReset,
    handleSave,
}: CatalogFilterProps) => {
    return (
        <div className="absolute left-0 mt-2 z-50 flex w-80 flex-col gap-4 rounded-2xl bg-white p-5 shadow-xl">
            <div>
                <p className="mb-3 font-bold text-gray-900">Диапазон цен</p>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-500">Минимальная цена</label>
                        <input
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
                            }
                            placeholder="0"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-500">Максимальная цена</label>
                        <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
                            }
                            placeholder="0"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div>
                <p className="mb-2 font-bold text-gray-900">Категории</p>
                <div className="flex flex-col">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilters((prev) => ({ ...prev, selectedCategory: cat }))}
                            className="flex items-center justify-between rounded px-1 py-2.5 text-sm transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                            <span
                                className={
                                    filters.selectedCategory === cat
                                        ? "font-semibold text-gray-900"
                                        : "text-gray-400"
                                }
                            >
                                {cat}
                            </span>
                            {filters.selectedCategory === cat && (
                                <span className="text-gray-900">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-1 flex gap-3">
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                    Сброс
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 rounded-xl bg-[#1F1F1F] py-2.5 text-sm font-medium text-white transition-colors hover:bg-black"
                >
                    Сохранить
                </button>
            </div>
        </div>
    )
}

export default CatalogFilter
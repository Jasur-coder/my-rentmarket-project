import type { ProductCardProps } from '@/components/type'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }
}

export const productService = {
  async getAllProducts(): Promise<ProductCardProps[]> {
    return apiClient.get<ProductCardProps[]>('/products')
  },

  async getProductById(id: number): Promise<ProductCardProps> {
    return apiClient.get<ProductCardProps>(`/products/${id}`)
  },

  async getProductsByCategory(category: string): Promise<ProductCardProps[]> {
    return apiClient.get<ProductCardProps[]>(`/products?category=${category}`)
  }
}

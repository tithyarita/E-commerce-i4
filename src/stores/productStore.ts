import { defineStore } from 'pinia'

export interface Group {
  id?: number
  name: string
}

export interface Category {
  id?: number
  name: string
  productCount: number
  color: string
  image: string
  groupId: number   // link to group
}

export interface Promotion {
  id?: number
  title: string
  color: string
  image: string
  buttonText: string
  buttonColor: string
}

export interface Product {
  id?: number
  title: string
  name: string
  rating: number
  size: string
  image: string
  price: number
  promotionAsPercentage: number
  discountcolor: string
  categoryId: number
  inStock: boolean
  countSold: number
  groupId: number
}

export const useProductStore = defineStore('product', {
  state: () => ({
    groups: [] as Group[],
    promotions: [] as Promotion[],
    categories: [] as Category[],
    products: [] as Product[]
  }),

  getters: {
    // List all categories by group name
    getCategoriesByGroup: (state) => {
      return (groupName: string): Category[] => {
        const group = state.groups.find(g => g.name === groupName)
        if (!group) return []
        return state.categories.filter(c => c.groupId === group.id)
      }
    },

    // List all products by group name
    getProductsByGroup: (state) => {
      return (groupName: string): Product[] => {
        const group = state.groups.find(g => g.name === groupName)
        if (!group) return []
        return state.products.filter(p => p.groupId === group.id)
      }
    },

    // List all products by category ID
    getProductsByCategory: (state) => {
      return (categoryId: number): Product[] => {
        return state.products.filter(p => p.categoryId === categoryId)
      }
    },

    // List popular products (countSold > 10)
    getPopularProducts: (state) => {
      return state.products.filter(p => p.countSold > 10)
    },

    // Optional: list of category names for menu
    categoryNames(state) {
      return ['All', ...state.categories.map(c => c.name)]
    }
  },

  actions: {
    async fetchGroups() {
      try {
        const res = await fetch('http://localhost:3000/api/groups')
        this.groups = await res.json()
      } catch (err) {
        console.error('Failed to fetch groups', err)
      }
    },

    async fetchCategories() {
      try {
        const res = await fetch('http://localhost:3000/api/categories')
        this.categories = await res.json()
      } catch (err) {
        console.error('Failed to fetch categories', err)
      }
    },

  async fetchProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/products')
    const data: any[] = await res.json()

    // Add default title and discountcolor if missing
  this.products = data.map(p => ({
  ...p,
  title: p.title ?? '', // empty string if missing
  name: p.name,
  discountcolor: p.discountcolor || '#10b981',
  rating: Number(p.rating),
  price: Number(p.price),
  countSold: Number(p.countSold),
  categoryId: Number(p.categoryId),
  groupId: p.groupId ? Number(p.groupId) : 0
}))


  } catch (err) {
    console.error('Failed to fetch products', err)
  }
}

,
 async deleteProduct(id: number) {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete product')

      // remove from store
      this.products = this.products.filter(p => p.id !== id)
      alert('Product deleted successfully')
    } catch (err) {
      console.error('Delete product error:', err)
    }
  },


    async fetchPromotions() {
      try {
        const res = await fetch('http://localhost:3000/api/promotions')
        this.promotions = await res.json()
      } catch (err) {
        console.error('Failed to fetch promotions', err)
      }
    },

    async fetchAll() {
      await Promise.all([
        this.fetchGroups(),
        this.fetchCategories(),
        this.fetchProducts(),
        this.fetchPromotions()
      ])
    }
  }
})

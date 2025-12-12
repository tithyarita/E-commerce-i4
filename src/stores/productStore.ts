import { defineStore } from 'pinia'

// --- INTERFACES ---

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
  groupId: number // link to group
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
  name: string
  detail: string
  vendor?: string
  rating: number
  size: string
  image: string
  price: number
  promotionAsPercentage: number // The percentage discount (e.g., 17)
  discountcolor: string
  categoryId: number
  // Backend may expose instock (number) — normalize to `inStock` (boolean)
  instock?: number
  inStock: number
  countSold: number
  // Backend may expose `group` (string or number)
  group?: string | number
  groupId: number
}

// --- STORE DEFINITION ---

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

    // Getter for filtering products by category ID (re-added as it's useful)
    getProductsByCategory: (state) => {
      return (categoryId: number): Product[] => {
        return state.products.filter(p => p.categoryId === categoryId)
      }
    },

    // List popular products (countSold > 10)
    getPopularProducts: (state) => {
      return state.products.filter(p => p.countSold > 10)
    },

    // List of category names for the menu
    categoryNames(state) {
      return ['All', ...state.categories.map(c => c.name)]
    }
  },

  actions: {
    // --- FETCH ACTIONS ---

    async fetchGroups() {
      try {
        const res = await fetch('http://localhost:3000/api/groups')
        if (!res.ok) throw new Error('Network response was not ok for groups')
        this.groups = await res.json()
      } catch (err) {
        console.error('Failed to fetch groups', err)
      }
    },

    async fetchCategories() {
      try {
        const res = await fetch('http://localhost:3000/api/categories')
        if (!res.ok) throw new Error('Network response was not ok for categories')
        this.categories = await res.json()
      } catch (err) {
        console.error('Failed to fetch categories', err)
      }
    },

    // --- MODIFIED fetchProducts action in useProductStore.ts ---

async fetchProducts() {
    try {
        const res = await fetch('http://localhost:3000/api/products')
        if (!res.ok) throw new Error('Network response was not ok for products')
        const data: any[] = await res.json()

        // Map API data to your store, ensuring correct data types and fallbacks
this.products = data.map(p => ({
  ...p,
  rating: Number(p.rating) || 0,
  price: Number(p.price) || 0,
  promotionAsPercentage: Number(p.promotionAsPercentage) || 0,
  countSold: Number(p.countSold) || 0,
  categoryId: Number(p.categoryId) || 0,
  group: String(p.group || 'default'),
  instock: Number(p.instock) || 0,            // keep numeric stock
  inStock: Number(p.instock) > 0,             // boolean for frontend
  detail: (p.detail && String(p.detail).trim()) || 'No description available',
  discountcolor: (p.discountcolor && String(p.discountcolor).trim()) || '#10b981',
  image: (() => {
    try {
      const img = JSON.parse(p.image)
      return Array.isArray(img) ? img : [p.image]
    } catch {
      return [p.image]
    }
  })(),
}))


    } catch (err) {
        console.error('Failed to fetch products', err)
    }
},

    async fetchPromotions() {
      try {
        const res = await fetch('http://localhost:3000/api/promotions')
        if (!res.ok) throw new Error('Network response was not ok for promotions')
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
    },

    // --- PATCH/UPDATE ACTION ---

    async patchProduct(id: number, updatedData: Partial<Product>) {
      try {
        // Translate frontend-friendly field names to backend expected names
        const payload: any = { ...updatedData }
        // If frontend uses `inStock`, send backend `instock` as 1/0
        if (Object.prototype.hasOwnProperty.call(payload, 'inStock')) {
          payload.instock = payload.inStock ? 1 : 0
          delete payload.inStock
        }
        // If frontend uses `groupId`, send backend `group` (some backends expect group as id or name)
        if (Object.prototype.hasOwnProperty.call(payload, 'groupId')) {
          payload.group = payload.group ?? payload.groupId
          delete payload.groupId
        }
        // Ensure rating is numeric
        if (Object.prototype.hasOwnProperty.call(payload, 'rating')) {
          payload.rating = Number(payload.rating)
        }

        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          // IMPORTANT: Add Authorization header if your backend requires it
          // headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_ADMIN_TOKEN' }
        })

        if (!res.ok) {
          const errorBody = await res.json().catch(() => ({}));
          throw new Error(`Failed to patch product. Status: ${res.status}. Error: ${errorBody.message || 'Unknown error'}`);
        }

        const updatedProduct = await res.json() as Product;

        // Update the local store state with the returned product data
        this.products = this.products.map(p =>
          p.id === id ? { ...p, ...updatedProduct } : p
        );

        alert(`Product ${id} updated successfully.`);

        return updatedProduct;
      } catch (err) {
        console.error(`Patch product error for ID ${id}:`, err);
        alert('Failed to update product. Check console for details.');
      }
    },

    // --- DELETE ACTIONS ---

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

    async deleteAllProducts() {
  const confirmDelete = confirm('Are you sure you want to delete all products?')
  if (!confirmDelete) return

  const res = await fetch('http://localhost:3000/api/products/all', { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete all products')

  this.products = []
  alert('All products deleted successfully')
}
  }
})

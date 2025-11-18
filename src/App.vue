<template>
  <div id="app">
    <h2>Categories</h2>

    <div class="category-list">
      <CategoryCom
        v-for="(cat, index) in categories"
        :key="index"
        :image="getImageUrl(cat.image)"
        :title="cat.name"
        :items="cat.productCount"
      />
    </div>

    <h2>Promotions</h2>

    <div class="Promo-list">
      <PromotionCom
        v-for="(promo, index) in promotions"
        :key="index"
        :title="promo.title"
        :image="getImageUrl(promo.image)"
        :buttonLabel="promo.buttonText"
        :buttonColor="promo.buttonColor"
        :backgroundColor="promo.color"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import CategoryCom from './components/CategoryCom.vue'
import PromotionCom from './components/PromotionCom.vue'
import axios from 'axios'

// Types
interface Category {
  id?: number
  name: string
  productCount: number
  color: string
  image: string
}

interface Promotion {
  id?: number
  title: string
  color: string
  image: string
  buttonText: string
  buttonColor: string
}

export default {
  name: 'App',
  components: { CategoryCom, PromotionCom },

  setup() {
    const categories = ref<Category[]>([])
    const promotions = ref<Promotion[]>([])

    const API_BASE = 'http://localhost:3000'

    // Helper function to fix image paths
    const getImageUrl = (imagePath: string | undefined) => {
      if (!imagePath) return 'https://via.placeholder.com/150'
      // Replace backslashes with forward slashes and encode spaces
      const path = imagePath.replace(/\\/g, '/')
      return `${API_BASE}/${path.replace(/ /g, '%20')}`
    }

    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(`${API_BASE}/api/categories`)
        if (response.data && response.data.length) {
          categories.value = response.data
        } else {
          console.warn('Categories API returned empty data.')
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        // fallback hardcoded categories
        categories.value = [
          { name: 'Cake & Milk', productCount: 14, color: '#F2FCE4', image: 'uploads/category/1763009937403-950561442-cat-13 1.png' },
          { name: 'Peach', productCount: 17, color: '#F3E8E8', image: 'uploads/category/cat-14.png' },
          { name: 'Organic Kiwi', productCount: 21, color: '#E7EAF3', image: 'uploads/category/cat-12.png' },
        ]
      }
    }

    // Fetch promotions from API
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<Promotion[]>(`${API_BASE}/api/promotions`)
        if (response.data && response.data.length) {
          promotions.value = response.data
        } else {
          console.warn('Promotions API returned empty data.')
        }
      } catch (error) {
        console.error('Failed to fetch promotions:', error)
        // fallback hardcoded promotions
        promotions.value = [
          {
            title: 'Everyday Fresh & Clean with Our Products',
            image: 'uploads/promotion/Cms-04.png',
            buttonText: 'Shop Now ➜',
            buttonColor: '#2ecc71',
            color: '#F0E8D5',
          },
          {
            title: 'Make your Breakfast Healthy and Easy',
            image: 'uploads/promotion/Cat-01.png',
            buttonText: 'Shop Now ➜',
            buttonColor: '#3498db',
            color: '#F3E8E8',
          },
        ]
      }
    }

    onMounted(() => {
      fetchCategories()
      fetchPromotions()
    })

    return { categories, promotions, getImageUrl }
  },
}
</script>

<style>
#app {
  padding: 20px;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

.category-list {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.Promo-list {
  display: flex;
  gap: 15px;
  margin-top: 40px;
}
</style>

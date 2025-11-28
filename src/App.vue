<template>
  <div id="app">
    <!-- Categories -->
    <h2>Categories</h2>
    <div class="category-list">
      <CategoryCom
        v-for="cat in productStore.categories"
        :key="cat.id ?? cat.name"
        :image="getImageUrl(cat.image)"
        :title="cat.name"
        :items="cat.productCount"
      />
    </div>

    <!-- Promotions -->
    <h2>Promotions</h2>
    <div class="Promo-list">
      <PromotionCom
        v-for="promo in productStore.promotions"
        :key="promo.id ?? promo.title"
        :title="promo.title"
        :image="getImageUrl(promo.image)"
        :buttonLabel="promo.buttonText"
        :buttonColor="promo.buttonColor"
        :backgroundColor="promo.color"
      />
    </div>

    <!-- Category Menu -->
    <CategoryMenu
      v-model="selectedCategory"
      :categories="productStore.categoryNames"
    />

    <!-- Products -->
    <h2>Popular Products</h2>
    <div class="product-list">
      <ProductCom
        v-for="prod in filteredProducts"
        :key="prod.id ?? prod.name"
        :product="prod"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from './stores/productStore'
import type { Product } from './stores/productStore'

import CategoryCom from './components/CategoryCom.vue'
import PromotionCom from './components/PromotionCom.vue'
import ProductCom from './components/ProductCom.vue'
import CategoryMenu from './components/CategoryMenu.vue'

export default {
  name: 'App',
  components: {
    CategoryCom,
    PromotionCom,
    ProductCom,
    CategoryMenu,
  },
  setup() {
    const productStore = useProductStore()
    const selectedCategory = ref('All')
    const API_BASE = 'http://localhost:3000'

    const getImageUrl = (imagePath: string | undefined) => {
      if (!imagePath) return 'https://via.placeholder.com/220x220?text=No+Image'
      if (imagePath.startsWith('http') || imagePath.startsWith('//'))
        return imagePath
      return `${API_BASE}/${imagePath.replace(/\\/g, '/').replace(/ /g, '%20')}`
    }

    const filteredProducts = computed<Product[]>(() => {
      if (selectedCategory.value === 'All') return productStore.products

      const category = productStore.categories.find(
        (c) => c.name === selectedCategory.value
      )
      if (!category) return []

      return productStore.products.filter(
        (p) => p.categoryId === category.id
      )
    })

    onMounted(async () => {
      await productStore.fetchAll()
    })

    return {
      productStore,
      selectedCategory,
      filteredProducts,
      getImageUrl,
    }
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
  overflow-x: auto;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
  margin-top: 20px;
}
</style>

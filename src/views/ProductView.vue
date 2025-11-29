<template>
  <div>
    <h1>{{ product?.name }}</h1>
    <p>{{ product?.detail }}</p>
    <img :src="imageUrl" alt="" />
    <p>Price: ${{ product?.price }}</p>
    <p>Rating: {{ product?.rating }}/5</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const store = useProductStore()

// Get product ID from URL
const productId = Number(route.params.productId)

// Find the product in store
const product = computed(() =>
  store.products.find(p => p.id === productId)
)

// Compute image URL
const API_BASE = 'http://localhost:3000'
const imageUrl = computed(() => {
  if (!product.value?.image) return ''
  try {
    const arr = JSON.parse(product.value.image)
    return arr.length ? `${API_BASE}/${arr[0].replace(/\\/g, '/').replace(/ /g, '%20')}` : ''
  } catch {
    return product.value.image
  }
})
</script>

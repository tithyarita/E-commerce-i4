<template>
  <div>
    <h1>Category: {{ category?.name }}</h1>
    <div v-if="products.length === 0">No products in this category.</div>
    <div class="product-list">
      <ProductCom
        v-for="p in products"
        :key="p.id"
        :product="p"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ProductCom from '@/components/ProductCom.vue'

const route = useRoute()
const store = useProductStore()

const categoryId = Number(route.params.categoryId)
const category = computed(() => store.categories.find(c => c.id === categoryId))

const products = computed(() =>
  store.products.filter(p => p.categoryId === categoryId)
)
</script>

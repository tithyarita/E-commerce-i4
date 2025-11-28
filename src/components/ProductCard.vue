<template>
  <div class="product-card relative border rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition">
    <!-- Badge -->
    <div v-if="badge" class="absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded" :class="badgeClass">
      {{ badge }}
    </div>

    <!-- Product Image -->
    <img :src="image" alt="product image" class="w-full h-32 object-cover rounded-md mb-2"/>

    <!-- Product Info -->
    <div class="flex-1 flex flex-col justify-between">
      <h3 class="text-sm font-semibold mb-1">{{ name }}</h3>
      <p class="text-xs text-gray-500 mb-2">{{ description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-sm font-bold">${{ price.toFixed(2) }}</span>
        <button class="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600 transition">Add +</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductCard',
  props: {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    badge: { type: String, default: '' }
  },
  computed: {
    badgeClass() {
      switch(this.badge?.toLowerCase()) {
        case 'sale': return 'bg-yellow-400 text-white'
        case 'hot': return 'bg-red-500 text-white'
        case 'promo': return 'bg-green-500 text-white'
        default: return 'bg-gray-400 text-white'
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  min-width: 150px;
}
</style>

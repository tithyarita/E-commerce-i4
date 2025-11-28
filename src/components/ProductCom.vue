<template>
  <div class="product-card">
    <!-- DISCOUNT BADGE -->
    <div v-if="badgeText" class="badge" :style="{ backgroundColor: product.discountcolor }">
      {{ badgeText }}
    </div>

    <!-- PRODUCT IMAGE -->
    <img :src="image" :alt="product.name" class="product-img" />

    <div class="info">
      <!-- PRODUCT TITLE & NAME -->
      <h3 class="title">{{ product.title }}</h3>
      <h2 class="name">{{ product.name }}</h2>

      <!-- RATING -->
      <div class="rating">
        <i
          v-for="n in 5"
          :key="n"
          :class="n <= product.rating ? 'fas fa-star filled' : 'far fa-star empty'"
        ></i>
        <span class="rating-number">{{ product.rating }}</span>
      </div>

      <!-- SIZE -->
      <p class="size">Size: {{ product.size }}</p>

      <!-- PRICES & QUANTITY -->
      <div class="price-row">
        <span class="new-price">${{ product.price.toFixed(2) }}</span>
        <span v-if="oldPrice" class="old-price">${{ oldPrice }}</span>

        <button v-if="qty === 0" class="btn-add" @click="increase">Add +</button>
        <div v-else class="qty-inline">
          <span class="qty-icon" @click="decrease">▾</span>
          <span class="qty-value">{{ qty }}</span>
          <span class="qty-icon" @click="increase">▴</span>
        </div>
      </div>

      <p v-if="!product.inStock" class="out-of-stock">Out of stock</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/stores/productStore'

const props = defineProps<{ product: Product }>()
const API_BASE = 'http://localhost:3000'

// IMAGE: parse JSON array or fallback
const image = computed(() => {
  if (!props.product.image) return 'https://via.placeholder.com/220x220?text=No+Image'

  try {
    const arr = JSON.parse(props.product.image)
    if (arr.length > 0) {
      const first = arr[0]
      return first.startsWith('http')
        ? first
        : `${API_BASE}/${first.replace(/\\/g, '/').replace(/ /g, '%20')}`
    }
  } catch {
    // fallback if not JSON
    return props.product.image.startsWith('http')
      ? props.product.image
      : `${API_BASE}/${props.product.image.replace(/\\/g, '/').replace(/ /g, '%20')}`
  }
})

// BADGE LOGIC
const badgeText = computed(() => {
  if (props.product.promotionAsPercentage > 0) return `-${props.product.promotionAsPercentage}%`
  if (props.product.countSold > 10) return 'Hot'
  if (!props.product.inStock) return 'Out of stock'
  return null
})

// OLD PRICE CALCULATION
const oldPrice = computed(() => {
  if (props.product.promotionAsPercentage > 0) {
    return (props.product.price / (1 - props.product.promotionAsPercentage / 100)).toFixed(2)
  }
  return null
})

// QUANTITY
const qty = ref(0)
const increase = () => qty.value++
const decrease = () => { if (qty.value > 0) qty.value-- }
</script>

<style scoped>
.product-card {
  width: 220px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  position: relative;
  transition: 0.25s ease-in-out;
}
.product-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  font-size: 12px;
}

.product-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 10px;
}

.title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 3px;
}
.name {
  font-size: 13px;
  color: #374151;
  margin-bottom: 5px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 6px;
}
.filled { color: #f6ad55; }
.empty { color: #d1d5db; }
.rating-number { margin-left: 6px; font-size: 13px; color: #6b7280; }

.size { font-size: 13px; color: #6b7280; }

.price-row { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
.new-price { font-size: 16px; font-weight: bold; color: #10b981; }
.old-price { text-decoration: line-through; font-size: 14px; color: #9ca3af; }

.btn-add {
  padding: 6px 10px;
  border-radius: 6px;
  background: #10b981;
  color: white;
  border: none;
  cursor: pointer;
}
.qty-inline {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #10b981;
  border-radius: 6px;
  color: white;
  justify-content: center;
  padding: 2px 4px;
}
.qty-value { min-width: 20px; text-align: center; }
.qty-icon { font-size: 14px; cursor: pointer; user-select: none; }

.out-of-stock {
  color: red;
  font-weight: bold;
  margin-top: 5px;
}
</style>

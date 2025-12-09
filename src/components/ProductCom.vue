<template>
  <router-link :to="`/products/${product.id}`" class="product-card-link">
    <div class="product-card">
      <div v-if="badgeText" class="badge" :style="{ backgroundColor: product.discountcolor }">
        {{ badgeText }}
      </div>

      <div class="img-container">
        <img :src="image" :alt="product.name" class="product-img" />
      </div>

      <div class="info">
        <h3 class="name">{{ product.name }}</h3>
        <p class="detail">{{ product.detail }}</p>

        <div class="rating">
          <i
            v-for="n in 5"
            :key="n"
            :class="n <= product.rating ? 'fas fa-star filled' : 'far fa-star empty'"
          ></i>
          <span class="rating-number">({{ product.rating }})</span>
        </div>

        <p class="size">{{ product.size }}</p>

        <div class="price-row">
          <div class="price-section">
            <span class="new-price">${{ product.price.toFixed(2) }}</span>
            <span v-if="oldPrice" class="old-price">${{ oldPrice }}</span>
          </div>

          <div class="qty-inline">
            <span class="qty-icon" @click.stop.prevent="decrease">−</span>
            <span class="qty-value">{{ qty }}</span>
            <span class="qty-icon" @click.stop.prevent="increase">+</span>
          </div>
        </div>

        <p v-if="!product.inStock" class="out-of-stock">Out of stock</p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/stores/productStore'

const props = defineProps<{ product: Product }>()
const API_BASE = 'http://localhost:3000'

// --- IMAGE LOGIC ---
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
    return props.product.image.startsWith('http')
      ? props.product.image
      : `${API_BASE}/${props.product.image.replace(/\\/g, '/').replace(/ /g, '%20')}`
  }
  return 'https://via.placeholder.com/220x220?text=No+Image'
})

// --- BADGE LOGIC ---
const badgeText = computed(() => {
  if (props.product.promotionAsPercentage > 0) return `-${props.product.promotionAsPercentage}%`
  if (props.product.countSold > 10) return 'Hot'
  if (!props.product.inStock) return 'Out of stock'
  return null
})

// --- PRICE LOGIC ---
const oldPrice = computed(() => {
  if (props.product.promotionAsPercentage > 0) {
    const originalPrice = props.product.price / (1 - props.product.promotionAsPercentage / 100);
    return originalPrice.toFixed(2)
  }
  return null
})

// --- QUANTITY LOGIC ---
const qty = ref(0)
const increase = () => { if (props.product.inStock) qty.value++ }
const decrease = () => { if (qty.value > 0) qty.value-- }
</script>

<style scoped>
/* ... (Your existing styles remain unchanged, specifically the .qty-inline and related styles) ... */

.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-card {
  width: 220px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  transition: 0.2s ease;
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  color: white;
  font-weight: 600;
  border-radius: 12px;
  font-size: 11px;
  z-index: 1;
}

.img-container {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
}

.product-img {
  width: auto;
  height: 100%;
  object-fit: contain;
}

.info {
  padding: 0;
}

.vendor {
  font-size: 11px;
  color: #9ca3af;
  margin: 0 0 6px 0;
  font-weight: 500;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
  line-height: 1.3;
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.detail {
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.rating {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
}
.filled {
  color: #fbbf24;
  font-size: 12px;
}
.empty {
  color: #e5e7eb;
  font-size: 12px;
}
.rating-number {
  margin-left: 4px;
  font-size: 12px;
  color: #6b7280;
}

.size {
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 6px;
}

.new-price {
  font-size: 16px;
  font-weight: 700;
  color: #10b981;
}

.old-price {
  text-decoration: line-through;
  font-size: 12px;
  color: #9ca3af;
}

.btn-add {
  padding: 6px 12px;
  border-radius: 6px;
  background: transparent;
  color: #10b981;
  border: 1px solid #d1fae5;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: 0.15s;
  min-width: 50px;
}
.btn-add:hover {
  background: #e0f7f4;
}

.qty-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d1fae5;
  border-radius: 6px;
  color: #10b981;
  padding: 0;
  font-weight: 600;
  font-size: 12px;
  width: 70px;
  background: #f0fdfb;
}

.qty-value {
  flex: 1;
  text-align: center;
  padding: 6px 0;
}

.qty-icon {
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  line-height: 1;
  padding: 6px 8px;
  color: #d1fae5;
  transition: 0.15s;
}
.qty-icon:hover {
  color: #10b981;
}

.out-of-stock {
  color: #ef4444;
  font-weight: 700;
  margin-top: 6px;
  font-size: 11px;
}
</style>

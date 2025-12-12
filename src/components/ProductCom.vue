<template>
  <router-link :to="`/products/${product.id}`" class="product-card-link">
    <div class="product-card">

      <!-- BADGE -->
      <div v-if="badgeText" class="badge" :style="{ backgroundColor: product.discountcolor }">
        {{ badgeText }}
      </div>

      <!-- IMAGE -->
      <div class="img-container">
        <img :src="image" :alt="product.name" class="product-img" />
      </div>

      <div class="info">

        <!-- STATIC VENDOR -->
        <p class="vendor">Hodo Foods</p>

        <!-- NAME -->
        <p class="name">{{ product.name }}</p>

        <!-- RATING -->
        <div class="rating">
          <i
            v-for="n in 5"
            :key="n"
            :class="n <= ratingNumber ? 'fas fa-star filled' : 'far fa-star empty'"
          ></i>
          <span class="rating-number">({{ ratingNumber }}/5)</span>
        </div>

        <!-- SIZE -->
        <p class="size">{{ product.size }}</p>

        <!-- PRICE + QTY -->
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

        <!-- STOCK STATUS -->
        <p v-if="stockNumber <= 0" class="out-of-stock">Out of stock</p>
        <p v-else class="instock">Stock</p>

      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import type { Product } from "@/stores/productStore"

const props = defineProps<{ product: Product }>()
const API_BASE = "http://localhost:3000"

// =========================================
// IMAGE FIX — SAFE FOR array | JSON string | string
// =========================================
const image = computed(() => {
  const img = props.product.image

  if (!img) return "https://via.placeholder.com/220x220?text=No+Image"

  // Case 1 — Already array
  if (Array.isArray(img)) {
    if (!img.length) return "https://via.placeholder.com/220x220?text=No+Image"
    const first = img[0]
    return first.startsWith("http")
      ? first
      : `${API_BASE}/${first.replace(/\\/g, "/").replace(/ /g, "%20")}`
  }

  // Case 2 — JSON string array
  try {
    const arr = JSON.parse(img)
    if (Array.isArray(arr) && arr.length > 0) {
      const first = arr[0]
      return first.startsWith("http")
        ? first
        : `${API_BASE}/${first.replace(/\\/g, "/").replace(/ /g, "%20")}`
    }
  } catch (_) {
    // Continue to case 3
  }

  // Case 3 — plain string
  return img.startsWith("http")
    ? img
    : `${API_BASE}/${img.replace(/\\/g, "/").replace(/ /g, "%20")}`
})

// =========================================
// RATING
// =========================================
const ratingNumber = computed(() => {
  const r = Number(props.product.rating) || 0
  return Math.min(5, Math.max(0, r))
})

// =========================================
// STOCK LOGIC
// =========================================
const stockNumber = computed(() => Number(props.product.instock || 0))

// =========================================
// BADGE LOGIC
// =========================================
const badgeText = computed(() => {
  if (props.product.promotionAsPercentage > 0)
    return `-${props.product.promotionAsPercentage}%`
  if (stockNumber.value <= 0) return "Out of stock"
  if (props.product.countSold > 10) return "Hot"
  if (props.product.countSold <= 10) return "Sale"
  return null
})

// =========================================
// OLD PRICE (Only if discounted)
// =========================================
const oldPrice = computed(() => {
  const discount = props.product.promotionAsPercentage
  const price = props.product.price

  if (typeof discount !== "number" || discount <= 0 || discount >= 100) return null
  if (!price || price <= 0) return null

  const original = price / (1 - discount / 100)
  return original > price + 0.01 ? original.toFixed(2) : null
})

// =========================================
// QUANTITY
// =========================================
const qty = ref(0)
const increase = () => { if (stockNumber.value > 0) qty.value++ }
const decrease = () => { if (qty.value > 0) qty.value-- }
</script>

<style scoped>
.product-card-link { text-decoration: none; color: inherit; display: block; }
.product-card { width: 220px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 10px; background: white; position: relative; transition: 0.2s ease; }
.product-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

.badge { position: absolute; top: 10px; left: 10px; padding: 4px 10px; color: white; font-weight: 600; border-radius: 12px; font-size: 11px; }

.img-container { width: 100%; height: 140px; display: flex; align-items: center; justify-content: center; background: #f9fafb; border-radius: 8px; margin-bottom: 10px; overflow: hidden; }
.product-img { height: 100%; object-fit: contain; }

.vendor { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
.name { font-size: 14px; height: 36px; font-weight: 600; color: #1f2937; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.rating { display: flex; align-items: center; gap: 2px; margin-bottom: 6px; }
.filled { color: #fbbf24; font-size: 12px; }
.empty { color: #e5e7eb; font-size: 12px; }
.rating-number { margin-left: 4px; font-size: 12px; color: #6b7280; }

.size { font-size: 12px; color: #6b7280; margin-bottom: 8px; }

.price-row { display: flex; align-items: center; justify-content: space-between; }
.price-section{ gap: 10px; display: flex; align-items: center; }
.new-price { font-size: 16px; font-weight: 700; color: #10b981; }
.old-price { font-size: 14px; color: #9ca3af; text-decoration: line-through; }

.qty-inline { display: flex; align-items: center; border: 1px solid #d1fae5; border-radius: 6px; width: 70px; background: #f0fdfb; }
.qty-value { flex: 1; text-align: center; padding: 6px 0; }
.qty-icon { cursor: pointer; font-size: 16px; padding: 6px 8px; color: #d1fae5; }
.qty-icon:hover { color: #10b981; }

.out-of-stock { color: #ef4444; font-weight: 700; font-size: 11px; margin-top: 6px; }
.instock { color: #10b981; font-weight: 700; font-size: 11px; margin-top: 6px; }
</style>

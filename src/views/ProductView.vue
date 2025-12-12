<template>
  <div class="product-detail-view" v-if="product">
    <div class="header-section">
      <div class="breadcrumb">Home > {{ product.group || 'Category' }} > {{ product.name }}</div>
    </div>

    <div class="main-content-area">

      <div class="image-gallery">
        <div class="main-image-container">
          <img :src="imageUrl" :alt="product.name" class="main-product-img" />
        </div>
        <div class="thumbnail-row">
            <div class="thumbnail-item active">
                <img :src="imageUrl" :alt="product.name" />
            </div>
        </div>
      </div>

      <div class="product-info-panel">

        <p v-if="stockNumber <= 0" class="out-of-stock-detail">Out of stock</p>
        <p v-else class="instock-detail">
            In Stock
            <span v-if="stockNumber > 0">({{ stockNumber }} available)</span>
        </p>

        <h1 class="product-name">{{ product.name }}</h1>

        <div class="rating-detail">
          <i
            v-for="n in 5"
            :key="n"
            :class="n <= ratingNumber ? 'fas fa-star filled' : 'far fa-star empty'"
          ></i>
          <span class="rating-number">({{ ratingNumber }}/5)</span>
        </div>

        <div class="price-box">
          <span class="new-price-lg">${{ product.price.toFixed(2) }}</span>
          <span v-if="oldPrice" class="old-price-lg">${{ oldPrice }}</span>
        </div>

        <p class="product-description">{{ product.detail }}</p>

        <div class="action-row">
          <div class="qty-inline">
            <span class="qty-icon" @click="decrease">−</span>
            <span class="qty-value">{{ qty }}</span>
            <span class="qty-icon" @click="increase">+</span>
          </div>
          <button
            @click="addToCart"
            :disabled="stockNumber <= 0"
            class="btn-add-to-cart"
          >
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="btn-wishlist"><i class="far fa-heart"></i></button>
        </div>

        <div class="meta-data">
          <p>Vendor: <span class="meta-value">{{ product.group || 'Hodo Foods' }}</span></p>
          <p>SKU: <span class="meta-value">FWM15VKT</span></p>
        </div>
      </div>
    </div>

    <div class="tabs-section">
        <div class="tab-header">
            <button class="tab-button active">Description</button>
            <button class="tab-button">Additional Info</button>
            <button class="tab-button">Reviews ({{ product.rating || 0 }})</button>
        </div>
        <div class="tab-content">
            <p>{{ product.detail }}</p>
        </div>
    </div>
  </div>

  <div v-else class="loading-message">
    Loading product details...
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import type { Product } from '@/stores/productStore'

const route = useRoute()
const store = useProductStore()
const qty = ref(1)
const API_BASE = 'http://localhost:3000'

const productId = Number(route.params.productId)
const product = computed<Product | undefined>(() =>
  store.products.find(p => p.id === productId)
)

// --- CRITICAL COMPUTED PROPERTIES ---

const stockNumber = computed(() => Number(product.value?.instock || 0))

const ratingNumber = computed(() => {
    const r = Number(product.value?.rating) || 0
    return Math.min(5, Math.max(0, r))
})

const oldPrice = computed(() => {
  if (!product.value) return null;
  const discount = product.value.promotionAsPercentage
  const price = product.value.price

  if (typeof discount !== "number" || discount <= 0 || discount >= 100) return null
  if (!price || price <= 0) return null

  const original = price / (1 - discount / 100)
  return original > price + 0.01 ? original.toFixed(2) : null
})

// FIX: Corrected and robust imageUrl logic
const imageUrl = computed(() => {
    const img = product.value?.image

    if (!img) return "https://via.placeholder.com/600x600?text=No+Image"

    // Helper function to format the path (handles local/remote, slashes, spaces)
    const formatPath = (path: string) => {
      path = String(path); // Ensure it's a string
      const finalPath = path.replace(/\\/g, "/").replace(/ /g, "%20");
      return finalPath.startsWith("http") ? finalPath : `${API_BASE}/${finalPath}`;
    }

    let firstPath = String(img); // Assume it's a single string path from the store

    // 1. Try to parse if it looks like a JSON array string (safeguard)
    if (typeof img === 'string' && (img.startsWith('[') && img.endsWith(']'))) {
        try {
            const arr = JSON.parse(img);
            // Check if parsing worked and resulted in a non-empty array
            if (Array.isArray(arr) && arr.length > 0) {
                firstPath = arr[0]; // Use the first element from the array
            }
        } catch (_) {
            // If parsing fails, firstPath remains the original string (img)
        }
    }
    // 2. Fallback check for array type (less likely if Pinia cleanup worked)
    else if (Array.isArray(img) && img.length > 0) {
      firstPath = img[0];
    }

    // 3. Format and return the path
    return formatPath(firstPath);
});


// --- ACTION METHODS ---
const increase = () => { if (stockNumber.value > 0) qty.value++ }
const decrease = () => { if (qty.value > 1) qty.value-- }
const addToCart = () => {
    if (stockNumber.value > 0 && product.value) {
        alert(`Added ${qty.value} of ${product.value.name} to cart!`);
    }
}
</script>

<style scoped>
/* NOTE: Using the same styles as the previous iteration for consistency */

.product-detail-view { max-width: 1200px; margin: 0 auto; padding: 20px; font-family: 'Quicksand', sans-serif;  }
.main-content-area { display: flex; gap: 40px; margin-top: 20px; }

/* --- Image Gallery Styles --- */
.image-gallery { flex: 0 0 45%; }
.main-image-container { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; margin-bottom: 15px; }
.main-product-img { width: 100%; height: auto; display: block; }
.thumbnail-row { display: flex; gap: 10px; }
.thumbnail-item { width: 80px; height: 80px; border: 1px solid #e5e7eb; border-radius: 5px; overflow: hidden; cursor: pointer; }
.thumbnail-item.active { border-color: #10b981; }
.thumbnail-item img { width: 100%; height: 100%; object-fit: cover; }

/* --- Product Info Panel Styles --- */
.product-info-panel { flex: 1; }

/* Stock Status */
.instock-detail { color: #10b981; font-weight: 700; font-size: 16px; margin-bottom: 15px; }
.out-of-stock-detail { color: #ef4444; font-weight: 700; font-size: 16px; margin-bottom: 15px; }

/* Name and Rating */
.product-name { font-size: 32px; font-weight: 700; margin: 10px 0 15px; }
.rating-detail { display: flex; align-items: center; gap: 5px; margin-bottom: 20px; }
.filled { color: #fbbf24; }
.empty { color: #e5e7eb; }
.rating-number { font-size: 16px; color: #6b7280; }

/* Price Box */
.price-box { display: flex; align-items: baseline; gap: 15px; margin-bottom: 25px; }
.new-price-lg { font-size: 40px; font-weight: 700; color: #10b981; }
.old-price-lg { font-size: 24px; text-decoration: line-through; color: #9ca3af; }

/* Description */
.product-description { font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px; }

/* Action Row */
.action-row { display: flex; align-items: center; gap: 15px; margin-bottom: 30px; }
.qty-inline { display: flex; align-items: center; border: 1px solid #d1fae5; border-radius: 6px; color: #10b981; font-weight: 600; font-size: 16px; width: 120px; }
.qty-value { flex: 1; text-align: center; padding: 10px 0; }
.qty-icon { cursor: pointer; user-select: none; font-size: 20px; line-height: 1; padding: 10px 15px; color: #d1fae5; transition: 0.15s; }
.qty-icon:hover { color: #10b981; }

.btn-add-to-cart { background-color: #10b981; color: white; padding: 12px 25px; border-radius: 6px; font-size: 16px; font-weight: 600; border: none; cursor: pointer; transition: background-color 0.2s; }
.btn-add-to-cart:hover:not(:disabled) { background-color: #059669; }
.btn-add-to-cart:disabled { background-color: #9ca3af; cursor: not-allowed; }

.btn-wishlist { background: transparent; border: 1px solid #e5e7eb; color: #4b5563; padding: 12px; border-radius: 6px; font-size: 18px; cursor: pointer; }

/* Meta Data */
.meta-data p { font-size: 14px; color: #6b7280; margin-bottom: 5px; }
.meta-value { font-weight: 600; color: #1f2937; }

/* Tabs Section */
.tabs-section { margin-top: 40px; border-top: 1px solid #e5e7eb; font-family: 'Quicksand', sans-serif; }
.tab-header { display: flex; gap: 15px; margin-top: 20px; margin-bottom: 15px; font-family: 'Quicksand', sans-serif; }
.tab-button { background: transparent; border: none; padding: 10px 0; font-size: 16px; font-weight: 600; color: #6b7280; cursor: pointer; border-bottom: 3px solid transparent; transition: color 0.2s, border-color 0.2s; }
.tab-button.active { color: #10b981; border-bottom-color: #10b981; }
.tab-content { padding: 15px 0; font-size: 15px; color: #4b5563; }
</style>

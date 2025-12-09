<template>
  <header class="main-header">
    <div class="header-content">
      <div class="logo-section">
        <router-link to="/" class="logo-link">
         <div class="logo">
          <img src="../../img/Logo.png" alt="">
         </div>
        </router-link>
      </div>

      <div class="search-section">
        <div class="search-wrapper">
          <div class="category-dropdown" @click="toggleCategories">
            <span class="dropdown-label">{{ selectedCategory }}</span>
            <span class="dropdown-arrow">▼</span>
          </div>
          <input type="text" placeholder="Search for items" class="search-input" v-model="searchQuery">
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <nav class="user-actions">
        <router-link to="/account" class="action-item">
          <i class="fa-regular fa-user"></i>
          <span>Account</span>
        </router-link>
        <router-link to="/compare" class="action-item">
          <i class="fas fa-sync-alt"></i>
          <span>Compare</span>
        </router-link>
        <router-link to="/wishlist" class="action-item">
          <i class="fa-regular fa-heart"></i>
          <span>Wishlist</span>
        </router-link>
        <router-link to="/cart" class="action-item cart-item">
          <i class="fas fa-shopping-cart"></i>
          <span>Cart</span>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
// Assuming Font Awesome is loaded globally for the icons (fas fa-search, fas fa-user, etc.)

const selectedCategory = ref('All Categories');
const searchQuery = ref('');
const cartCount = ref(0); // Replace with your actual cart store value

const toggleCategories = () => {
  // Logic to show/hide category list
  console.log('Toggling category dropdown');
};

// Placeholder logic for future features
const handleSearch = () => {
  console.log(`Searching for: ${searchQuery.value} in ${selectedCategory.value}`);
};

</script>

<style scoped>
/*
  --- GENERAL LAYOUT ---
*/
.main-header {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
  padding: 10px 0;
}

.header-content {
  max-width: 1400px; /* Adjust based on your site's max width */
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/*
  --- 1. LOGO SECTION ---
*/
.logo-section {
  flex-shrink: 0;
}
.logo img{
  width: 150px;
  height: auto;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.logo-placeholder {
  display: flex;
  align-items: center;
}

.logo-icon {
  font-size: 40px;
  margin-right: 5px;
  line-height: 1;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-name {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6; /* Example color */
}

.logo-tagline {
  font-size: 10px;
  font-weight: 500;
  color: #6b7280;
}

/*
  --- 2. SEARCH SECTION ---
*/
.search-section {
  flex-grow: 1;
  max-width: 600px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #10b981; /* Green border color from image */
  border-radius: 6px;
  overflow: hidden;
  height: 48px; /* Standard input height */
}

.category-dropdown {
  display: flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  background-color: #f9fafb;
  border-right: 1px solid #10b981;
  color: #4b5563;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.dropdown-arrow {
  margin-left: 10px;
  font-size: 10px;
}

.search-input {
  flex-grow: 1;
  padding: 0 15px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #374151;
}

.search-button {
  background-color: transparent;
  border: none;
  padding: 0 15px;
  cursor: pointer;
  color: #10b981;
  font-size: 18px;
}

/*
  --- 3. USER ACTION ICONS ---
*/
.user-actions {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-shrink: 0;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #4b5563;
  font-size: 12px;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
}

.action-item:hover {
  color: #10b981;
}

.action-item i {
  font-size: 20px;
  margin-bottom: 3px;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #ef4444; /* Red badge */
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
}
</style>

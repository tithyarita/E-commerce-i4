<template>
  <nav class="secondary-menu">
    <div class="menu-content">

      <button class="browse-categories-btn" @click="toggleAllCategories">
        <i class="fas fa-bars"></i>
        <span>Browse All Categories</span>
        <span class="dropdown-arrow">▼</span>
      </button>

      <ul class="nav-links">
        <li class="nav-item hot-deals">
          <router-link to="/hot-deals" class="nav-link">
            <i class="fas fa-fire-alt"></i>
            Hot Deals
          </router-link>
        </li>
        <li v-for="link in mainLinks" :key="link.path" class="nav-item" :class="{ 'has-dropdown': link.hasDropdown }">
          <router-link :to="link.path" class="nav-link">
            {{ link.name }}
          </router-link>
          <span v-if="link.hasDropdown" class="dropdown-arrow-small">▼</span>
          </li>
      </ul>

      <div class="support-info">
        <div class="phone-icon-wrapper">
          <i class="fas fa-phone-alt"></i>
        </div>
        <div class="contact-details">
          <span class="phone-number">099 777 888</span>
          <span class="support-text">24/7 Support Center</span>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { reactive } from 'vue';
// Font Awesome is assumed to be loaded for icons (fas fa-bars, fas fa-fire-alt, fas fa-phone-alt)

const mainLinks = reactive([
  { name: 'Home', path: '/home', hasDropdown: false },
  { name: 'Food', path: '/food', hasDropdown: true },
  { name: 'Vegetables', path: '/vegetables', hasDropdown: true },
  { name: 'Drink', path: '/drink', hasDropdown: false },
  { name: 'Cookies', path: '/cookies', hasDropdown: false },
  { name: 'Meat & Seafood', path: '/meat-seafood', hasDropdown: true },
  { name: 'Bakery', path: '/bakery', hasDropdown: false },
]);

const toggleAllCategories = () => {
  // Logic to show/hide the mega category menu
  console.log('Toggling all categories menu');
};
</script>

<style scoped>
/*
  --- GENERAL LAYOUT ---
*/
.secondary-menu {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.menu-content {
  max-width: 1400px; /* Must match the max-width of the main header */
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/*
  --- 1. BROWSE ALL CATEGORIES BUTTON ---
*/
.browse-categories-btn {
  background-color: #4CAF50; /* Green color from image */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.browse-categories-btn:hover {
  background-color: #45a049;
}

.browse-categories-btn i {
  font-size: 16px;
}

.browse-categories-btn .dropdown-arrow {
  font-size: 8px;
  margin-left: 5px;
}

/*
  --- 2. MAIN NAVIGATION LINKS ---
*/
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-grow: 1;
}

.nav-item {
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #4CAF50;
}

.hot-deals .nav-link {
  color: #ef4444; /* Red color for Hot Deals */
  font-weight: 700;
}

.hot-deals .nav-link i {
  color: #ef4444;
}

.has-dropdown {
  display: flex;
  align-items: center;
}

.dropdown-arrow-small {
  font-size: 8px;
  margin-left: 5px;
  color: #6b7280;
}

/*
  --- 3. CONTACT SUPPORT ---
*/
.support-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.phone-icon-wrapper {
  /* Style the circle background seen in the image */
  background-color: #e0f2f1;
  color: #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.phone-number {
  color: #4CAF50;
  font-size: 18px;
  font-weight: 700;
}

.support-text {
  color: #6b7280;
  font-size: 10px;
}
</style>

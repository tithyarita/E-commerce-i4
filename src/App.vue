 <template>
  <div id="app">
    <h2></h2>

    <div class="category-list">
      <CategoryCom
        v-for="(cat, index) in categories"
        :key="index"
        :image="cat.image"
        :title="cat.title"
        :items="cat.items"
      />
    </div>

    <h2></h2>

    <div class="Promo-list">
      <PromotionCom
        v-for="(promo, index) in promotions"
        :key="index"
        :title="promo.title"
        :image="promo.image"
        :buttonLabel="promo.buttonLabel"
        :buttonColor="promo.buttonColor"
        :backgroundColor="promo.backgroundColor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CategoryCom from './components/CategoryCom.vue'
import PromotionCom from './components/PromotionCom.vue'

export default {
  name: 'App',
  components: { CategoryCom, PromotionCom },

  data() {
    return {
      categories: [
        {
          image: 'img/cat-13 1.png',title: 'Cake & Milk',items: 14,},
        { image: 'img/cat-14 1.png', title: 'Peach', items: 17 },
        { image: 'img/cat-12 1.png', title: 'Organic Kiwi', items: 21 },
        { image: 'img/cat-9 1.png', title: 'Red Apple', items: 68 },
        { image: 'img/cat-3 1.png', title: 'Snack', items: 34 },
        { image: 'img/cat-4 1.png', title: 'Block plum', items: 25 },
        { image: 'img/cat-1 4.png', title: 'Vegetables', items: 65 },
        { image: 'img/cat-15 1.png', title: 'Headphone', items: 33 },
        { image: 'img/cat-14 1.png', title: 'Cake & Milk', items: 54 },
        { image: 'img/cat-7 1.png', title: 'Orange', items: 63 },
      ],

      promotions: [
        {
          title: 'Everyday Fresh & Clean with Our Products',
          image: 'img/Cms-04 1.png',
          buttonLabel: 'Shop Now ➜',
          buttonColor: '#2ecc71',
          backgroundColor: '#F0E8D5',
        },
        {
          title: 'Make your Breakfast Healthy and Easy',
          image: 'img/Cat-01 1.png',
          buttonLabel: 'Shop Now ➜',
          buttonColor: '#3498db',
          backgroundColor: '#F3E8E8',
        },
        {
          title: 'Super Sale on Fresh Items',
          image: 'img/cms-03 1.png',
          buttonLabel: 'Shop Now ➜',
          buttonColor: '#FDC040',
          backgroundColor: '#E7EAF3',
        },
      ],
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
}
.Promo-list {
  display: flex;

  gap: 15px;
  margin-top: 40px;
}
</style>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Baloo&display=swap" rel="stylesheet">

  <router-link :to="`/categories/${id}`" style="text-decoration: none;">
    <div class="category-item">
      <img :src="image" :alt="title" class="category-image" />
      <h4>{{ title }}</h4>
      <p>{{ items }} items</p>
    </div>
  </router-link>
</template>

<script lang="ts">
export default {
  name: 'CategoryCom',
  props: {
    image: String,
    title: String,
    id: Number,
    items: Number,
  },
}
</script>

<style>
body {
  font-family: 'Baloo', cursive;
}

router-link {
  text-decoration: none;
}
/* OR if targeting the inner element */
.category-item {
  text-decoration: none;
}
.category-item {
  width: 136px;
  height: 177px;
  text-align: center;
  padding: 3px;
  background: #f2fce4;
  border: 1px;
  border-style: solid;
  border-color: green;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.category-image {
  width: 100px;
  height: 100px;
}

.category-item h4 {
  margin: 5px 0 5px 0;
  font-size: 16px;
  color: black;
  font-family: 'Baloo', cursive;
}

.category-item p {
  margin: 0;
  color: #666;
  font-size: 12px;
  font-family:
    'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
    sans-serif;
}
</style>

<template>
  <div class="category-item">
    <img :src="image" :alt="title" class="category-image" />
    <h4>{{ title }}</h4>
    <p>{{ items }} items</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CategoryCom',
  props: {
    image: String,
    title: String,
    items: Number,
  },
}
</script>

<style>
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
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
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

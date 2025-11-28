<template>
  <header class="header">
    <h1 class="logo">{{title}}</h1>

    <nav class="nav">
        <a href="#" class="nav-link">All</a>
        <a href="#" class="nav-link">Milk&Dairies</a>
        <a href="#" class="nav-link">Coffee&Teas</a>
        <a href="#" class="nav-link">Pet Foods</a>
        <a href="#" class="nav-link">Meals</a>
        <a href="#" class="nav-link">Vegetables</a>
        <a href="#" class="nav-link">Fruits</a>
    </nav>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Header"
  }
});
</script>

<style scoped>
.header {
  width: 100%;
  padding: 10px 0px;
  /* background: #4a90e2; */
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 15px;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-weight: 200;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>

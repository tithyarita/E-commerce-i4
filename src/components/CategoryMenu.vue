<template>
  <div class="product-menu">
    <button
      v-for="(cat, i) in categories"
      :key="i"
      :class="{ active: modelValue === cat }"
      @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  categories: string[]
  modelValue: string
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
.product-menu {
  display: flex;
  gap: 18px;
  margin: 15px 0 25px;
  flex-wrap: wrap;
}

.product-menu button {
  padding: 6px 14px;
  font-size: 14px;
  border-radius: 10px;
  border: none;
  background: #f6f6f6;
  cursor: pointer;
  transition: .2s;
}

.product-menu button.active {
  background: #1a9e63;
  color: #fff;
}

.product-menu button:hover {
  background: #e3f4ec;
}
</style>

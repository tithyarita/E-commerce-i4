  <template>
  <button class="shop-button" :style="{ backgroundColor: color }">
    {{ label }}
  </button>
</template>

<script lang="ts">
export default {
  name: 'ButtonCom',
  props: {
    label: {
      type: String,
      default: 'Shop Now',
    },
    color: {
      type: String,
      default: '#4CAF50',
    },
  },
}
</script>

<style>
.shop-button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

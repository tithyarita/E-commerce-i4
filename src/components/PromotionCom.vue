   <template>
  <div class="promotion" :style="{ backgroundColor: backgroundColor }">
    <div class="promotion-text">
      <h2>{{ title }}</h2>
      <ButtonCom :label="buttonLabel" :color="buttonColor" />
    </div>
    <img :src="image" :alt="title" class="promotion-image" />
  </div>
</template>

<script lang="ts">
import ButtonCom from './ButtonCom.vue'

export default {
  name: 'PromotionCom',
  components: { ButtonCom },
  props: {
    title: String,
    image: String,
    buttonLabel: String,
    buttonColor: String,
    backgroundColor: {
      type: String,
      default: '#f0e8d5',
    },
  },
}
</script>

<style>
.promotion {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 512px;
  height: 300px;
  border-radius: 10px;
  padding: 20px;
  margin: 15px auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.promotion-text {
  z-index: 1;
  max-width: 50%;
  text-align: left;
}

.promotion-text h2 {
  margin: 0 0 15px 0;
  font-size: 22px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
}

.promotion-image {
  position: absolute;
  right: 1px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
</style>

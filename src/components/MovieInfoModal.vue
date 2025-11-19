<template>
  <div class="info-modal">
    <header class="header">
      <h6>Movie info</h6>
      <p>{{ movie.Title }}</p>
      <BIcon class="close-info" icon="x" @click="eventCloseInfo" />
    </header>
  </div>
</template>

<script>
export default {
  name: "MovieInfoModal",
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    eventCloseInfo() {
      this.$emit("onEventCloseInfo");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(45deg, #270133, #940294);
  color: #fff;
}

.close-info {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>

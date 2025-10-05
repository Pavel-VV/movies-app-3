<template>
  <div class="movies-bg" :style="posterStyle"></div>
</template>

<script>
export default {
  name: "FonBg",
  props: {
    posterBg: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    defaultBg: "linear-gradient(45deg, #270133, #940294)",
  }),
  computed: {
    bgImage() {
      return this.posterBg ? `url(${this.posterBg})` : this.defaultBg;
    },
    posterStyle() {
      return { "background-image": `${this.bgImage}` };
    },
  },
};
</script>

<style scoped>
.movies-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: rgba(0, 0, 0, 0.7);
  transition: all, 0.2s ease;
  z-index: -1;
}

.movies-bg::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.7;
  background-image: linear-gradient(45deg, #270133, #940294);
}
</style>

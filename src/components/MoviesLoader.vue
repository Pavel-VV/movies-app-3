<template>
  <div v-if="getStateLoader" class="movies-loader">Loader</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MoviesLoader",
  computed: {
    ...mapGetters(["getStateLoader"]),
  },
};
</script>

<style scoped>
.movies-loader {
  position: fixed;
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>

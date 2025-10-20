<template>
  <div v-if="getStateLoader" class="movies-loader">
    <BSpinner type="grow" variant="light" label="Loading..."></BSpinner>
  </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
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

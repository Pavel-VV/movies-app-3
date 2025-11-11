<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShowToast",
  watch: {
    getLastToast: "showToast",
  },
  computed: {
    ...mapGetters(["getLastToast"]),
  },
  methods: {
    showToast(toast) {
      const { msg, title, variant } = toast;
      console.log(`show toast ${msg} ${title} ${variant}`);
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
      });
    },
  },
};
</script>

<style scoped></style>

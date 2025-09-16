<template>
  <BContainer>
    <h3 class="list-title">IMDB top 250</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">{{ key }}</BCol>
      </template>
      <div v-else>Empty List</div>
    </BRow>
  </BContainer>
</template>

<script>
export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
}
</style>

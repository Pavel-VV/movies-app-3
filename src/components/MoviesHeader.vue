<template>
  <header class="header">
    <BNavbar class="navbar" type="dark" variant="dark">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BNavForm>
          <BFormInput
            class="mr-sm-2 search"
            placeholder="Search"
            v-model="searchMovies"
            debounce="500"
          ></BFormInput>
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MoviesHeader",
  data: () => ({
    searchMovies: "",
  }),
  watch: {
    searchMovies: "getDataInput",
  },
  methods: {
    ...mapActions("movies", ["getSearchMovies", "toggleSearch", "fetchMovies"]),
    getDataInput(inputData) {
      console.log(`данные из input ${Boolean(inputData)}`);
      if (inputData) {
        this.getSearchMovies(inputData);
        this.toggleSearch(true);
      } else {
        this.toggleSearch(false);
        this.fetchMovies();
      }
    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.search {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.8);
  color: rgb(255, 255, 255);
  /* margin-left: auto; */
}

.search:focus {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.8);
  box-shadow: none;
  color: rgb(255, 255, 255);
}
</style>

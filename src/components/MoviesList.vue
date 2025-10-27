<template>
  <BContainer>
    <h3 class="list-title">IMDB top 250</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="getMovieBg(movie.Poster)"
            @onEventDeleteMovie="deleteMovie"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import { mapActions } from "vuex";
import MovieItem from "@/components/MovieItem";
export default {
  name: "MoviesList",
  components: { MovieItem },
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
  methods: {
    ...mapActions("movies", ["deleteMovieId"]),
    getMovieBg(bgUrl) {
      this.$emit("onGetMovieBg", bgUrl);
    },
    async deleteMovie({ id, title }) {
      const isConfirm = await this.$bvModal.msgBoxConfirm(
        `Are you sure delete "${title}"?`
      );
      if (isConfirm) {
        this.deleteMovieId(id);
      }
      // .then((value) => {
      //   if (value) this.deleteMovieId(id);
      // });
      // this.deleteMovieId(id);
      console.log(id, title); //3.54
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>

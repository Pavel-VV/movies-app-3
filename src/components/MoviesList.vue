<template>
  <BContainer>
    <h3 class="list-title">{{ moviesTitle }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="getMovieBg(movie.Poster)"
            @onEventDeleteMovie="deleteMovie"
            @onEventMovieInfo="getMovieInfo"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </BRow>
    <BModal
      body-class="modal-info"
      id="movie-modal-info"
      hide-footer
      hide-header
      size="lg"
    >
      <MovieInfoModal :movie="movieInfo" @onEventCloseInfo="closeModalInfo" />
    </BModal>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "@/components/MovieItem";
import MovieInfoModal from "@/components/MovieInfoModal";
export default {
  name: "MoviesList",
  components: { MovieItem, MovieInfoModal },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoID: "null",
  }),
  computed: {
    ...mapGetters("movies", ["searchState"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    moviesTitle() {
      return this.searchState ? "Search movies" : "IMDB top 250";
    },
    movieInfo() {
      return this.movieInfoID ? this.list[this.movieInfoID] : "null";
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
    getMovieInfo(id) {
      this.movieInfoID = id;
      this.$bvModal.show("movie-modal-info");
    },
    closeModalInfo() {
      this.movieInfoID = "null";
      this.$bvModal.hide("movie-modal-info");
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

<style>
.modal-info {
  padding: 0 !important;
}
</style>

<template>
  <div class="container mt-5">
    <input type="text" class="form-control mb-4" v-model="movieQuery" placeholder="Write movie name">
    <div v-if="movieQuery">
      <div v-if="movieList1.Response=='False' && movieList2.Response =='False'" class="alert alert-danger" role="alert">
        Movie not found...
      </div>
      <div v-else class="alert alert-primary" role="alert">
        {{ movieList1.totalResults }} movie found.
      </div>
    </div>
    <div class="row">
      <div v-if="movieList1.Search" class="col-md-4 mb-4" v-for="movie in movieList1.Search">
        <app-card :movie="movie">
          <router-link :to="'/detail/'+movie.imdbID">
            <a class="btn btn-primary float-end">Go to Movie</a>
          </router-link>
        </app-card>
      </div>
      <div v-if="movieList2.Search" class="col-md-4 mb-4" v-for="movie in movieList2.Search">
        <app-card :movie="movie">
          <router-link :to="'/detail/'+movie.imdbID">
            <a class="btn btn-primary float-end">Go to Movie</a>
          </router-link>
        </app-card>
      </div>
    </div>
    <app-page v-if="hesap>1">
      <li class="page-item" :class="page+ 1==i ? 'active': '' " v-for="i in hesap"><a class="page-link" href="#"
                                                                                      @click="page=i-1">{{ i }}</a></li>
    </app-page>
  </div>
</template>

<script>
import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard";
import axios from "axios"

export default {
  components: {
    appPage: Pagination,
    appCard: MovieCard
  },
  data() {
    return {
      movieQuery: '',
      page: 0,
      movieList1: [],
      movieList2: [],
    }
  },
  methods: {
    MovieDetail(movieId) {
      this.$store.commit("getMovieID", movieId)
      this.$router.push('/detail');
    }
  },
  computed: {
    getData() {
      return [this.movieQuery, this.page].join()
    },
    hesap() {
      return this.movieList1.totalResults ? Math.ceil((parseInt(this.movieList1.totalResults, 10)) / 20) : 1
    }
  },
  watch: {
    getData() {
      if (this.movieQuery == '') {
        this.page = 0
      }
      setTimeout(() => {
        axios.get('http://www.omdbapi.com/?s=' + this.movieQuery + '&page=' + (this.page * 2 + 1) + '&apikey=96e01a2d')
          .then(response => (this.movieList1 = response.data))
          .catch((err) => {
            console.log(err)
          })
        axios.get('http://www.omdbapi.com/?s=' + this.movieQuery + '&page=' + (this.page * 2 + 2) + '&apikey=96e01a2d')
          .then(response => (this.movieList2 = response.data))
          .catch((err) => {
            console.log(err)
          })
      }, 300)
    }
  }
}
</script>

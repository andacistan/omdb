<template>
  <div class="container">
    <h1 class="text-center mt-4">{{ movieDetails.Title }}</h1>
    <nav aria-label="breadcrumb mt-4">
      <ol class="breadcrumb">
        <router-link tag="li" :to="'/'" class="breadcrumb-item"><a>Home</a></router-link>
        <li class="breadcrumb-item active" aria-current="page">{{ movieDetails.Title }}</li>
      </ol>
    </nav>
    <div class="row mt-4">
      <div class="col-md-6">
        <img class="rounded-circle" :src="movieDetails.Poster" :alt="movieDetails.Title">
        <p class="lead mt-4">{{ movieDetails.Plot }}</p>
      </div>
      <div class="col-md-6">
        <ul class="list-group list-group-flush">
          <li v-if="movieDetails.Year" class="list-group-item">Year : {{ movieDetails.Year }}</li>
          <li v-if="movieDetails.Runtime" class="list-group-item">Run Time : {{ movieDetails.Runtime }}</li>
          <li v-if="movieDetails.Genre" class="list-group-item">Genre : {{ movieDetails.Genre }}</li>
          <li v-if="movieDetails.Director" class="list-group-item">Director : {{ movieDetails.Director }}</li>
          <li v-if="movieDetails.Writer" class="list-group-item">Writer : {{ movieDetails.Writer }}</li>
          <li v-if="movieDetails.Actors" class="list-group-item">Actors : {{ movieDetails.Actors }}</li>
          <li v-if="movieDetails.Language" class="list-group-item">Languange : {{ movieDetails.Language }}</li>
          <li v-if="movieDetails.Country" class="list-group-item">Country : {{ movieDetails.Country }}</li>
          <li v-if="movieDetails.Awards" class="list-group-item">Awards : {{ movieDetails.Awards }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Detail",
  data() {
    return {
      movieID: this.$route.params.id,
      movieDetails: []
    }
  },
  created() {
    axios.get('http://www.omdbapi.com/?i=' + this.movieID + '&apikey=96e01a2d')
      .then(response => (this.movieDetails = response.data))
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

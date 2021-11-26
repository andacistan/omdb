<template>
    <div class="card bg-light mb-3" style="width: 18rem;">
      <img class="card-img-top" :src="movie.Poster" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ movie.Title }}</h5>
        <p class="badge bg-warning"> {{movie.Year}}</p>
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: "MovieCard",
  props:['movie']
}
</script>

<style scoped>

</style>

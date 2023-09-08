<script setup>
import IconHeart from './IconHeart.vue'

const props = defineProps({
	movie: Object,
})

const formatDate = (dateString) => {
	if (dateString) {
		const date = new Date(dateString)
		const options = { day: '2-digit', month: 'short', year: 'numeric' }
		return date.toLocaleDateString('eu', options)
	}
	return ''
}
</script>

<template>
	<div class="movie-card">
		<div>
			<IconHeart class="movie-card-heart" />
			<img
				:src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
				alt="slide"
			/>
		</div>
		<div class="movie-names-block">
			<div class="movie-rating-icon">
				<span class="movie-rating-icon-count"> 75 </span>
				<span class="movie-rating-icon-percentage"> % </span>
			</div>

			<h4>{{ movie.original_title || movie.original_name }}</h4>
			<span>{{ formatDate(movie.release_date || movie.first_air_date) }}</span>
		</div>
	</div>
</template>

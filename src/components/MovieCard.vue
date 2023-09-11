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

const calcVoteColor = (vote) => {
	switch (true) {
		case vote >= 70:
			return { border: '3px solid green' }
		case vote >= 50:
			return { border: '3px solid orange' }
		case vote >= 0:
			return { border: '3px solid red' }
		default:
			return { color: '#fff' }
	}
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
			<div
				class="movie-rating-icon"
				:style="calcVoteColor((movie.vote_average * 10).toFixed())"
			>
				<span class="movie-rating-icon-count"> {{ (movie.vote_average * 10).toFixed() }}</span>
				<span class="movie-rating-icon-percentage"> % </span>
			</div>

			<h4>{{ movie.original_title || movie.original_name }}</h4>
			<span>{{ formatDate(movie.release_date || movie.first_air_date) }}</span>
		</div>
	</div>
</template>

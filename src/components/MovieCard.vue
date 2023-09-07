<script setup>
const props = defineProps({
  movie: Object,
})
// console.log(props)

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
	<div class="trend-slide">
		<img
			:src="`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`"
			alt="slide"
		/>
		<div class="trend-names-block">
			<span>{{ props.movie.original_title || props.movie.original_name }}</span>
			<span>{{ formatDate(movie.release_date || movie.first_air_date) }}</span>
		</div>
	</div>
</template>

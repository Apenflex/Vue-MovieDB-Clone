<script setup>
import { computed } from 'vue'
import { moviesStore } from '@/stores/moviesStore'

import IconHeart from './IconHeart.vue'
import IconTrash from './IconTrash.vue'

const props = defineProps({
	movie: Object,
	person: Object,
	type: String,
	favourite: Boolean,
})

const store = moviesStore()

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

const moviePoster = computed(() => {
	if (props.movie.poster_path !== null && props.movie.poster_path !== undefined) {
		return `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
	}
	return '../public/images/no-image.png'
})

const personPoster = computed(() => {
	if (props.person.profile_path !== null && props.person.profile_path !== undefined) {
		return `https://image.tmdb.org/t/p/w500${props.person.profile_path}`
	}
	return '../public/images/no-image.png'
})

</script>

<template>
	<div class="movie-card">
		<div>
			<IconHeart
				v-if="type === 'movie' && !favourite"
				class="icon-heart"
				@click="store.addFavouriteMovie(movie)"
			/>
			<IconTrash
				v-if="favourite"
				class="icon-trash"
				@click="store.removeFavouriteMovie(movie)"
			/>
			<img
				v-if="type === 'movie'"
				:src="moviePoster"
				:alt="movie.original_title || movie.original_name"
			/>
			<img
				v-if="type === 'person'"
				:src="personPoster"
				:alt="person.name"
			/>
		</div>
		<div class="description">
			<div
				v-if="type === 'movie'"
				class="icon-rating"
				:style="calcVoteColor((movie.vote_average * 10).toFixed())"
			>
				<span class="icon-count"> {{ (movie.vote_average * 10).toFixed() }}</span>
				<span class="icon-percentage"> % </span>
			</div>

			<div v-if="type === 'movie'">
				<h4>{{ movie.original_title || movie.original_name }}</h4>
				<span>{{ formatDate(movie.release_date || movie.first_air_date) }}</span>
			</div>

			<div v-if="type === 'person'">
				<h4>{{ person.name }}</h4>
				<span>{{ person.known_for[0].original_title || '' }}</span>
			</div>
		</div>
	</div>
</template>

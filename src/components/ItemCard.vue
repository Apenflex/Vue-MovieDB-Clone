<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useFavouritesStore } from '@/stores/moviesStore'

import IconHeart from './IconHeart.vue'
import IconTrash from './IconTrash.vue'

const props = defineProps({
	movie: Object,
	person: Object,
	type: String,
	favourite: Boolean,
})

const favouriteStore = useFavouritesStore()
const heartColor = ref('#fff')
const addedToFavourite = ref(false)

const formatDate = computed(() => {
	if (props.movie.release_date || props.movie.first_air_date) {
		const date = new Date(props.movie.release_date || props.movie.first_air_date)
		const options = { day: '2-digit', month: 'short', year: 'numeric' }
		return date.toLocaleDateString('eu', options)
	}
	return ''
})

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

const favouriteColor = computed(() => {
	return favouriteStore.favouriteMovies.find((item) => item.id === props.movie.id) ? '#ff0000' : '#fff'
})

const handleAddFavourite = (movie) => {
	// console.log('add')
	addedToFavourite.value = true
	favouriteStore.addFavouriteMovie(movie)
	setTimeout(() => {
		addedToFavourite.value = false
	}, 3000)
}

watch(favouriteStore.getFavouriteMovies, () => {
	// console.log('watch')
	heartColor.value = favouriteColor.value
})

onMounted(() => {
	// console.log('mounted')
	heartColor.value = favouriteColor.value
})
</script>

<template>
	<div class="movie-card">
		<div>
			<IconHeart
				v-if="type === 'movie' && !favourite"
				@click.prevent="handleAddFavourite(movie)"
				:color="heartColor"
				:class="['icon-heart', {'animate': addedToFavourite}]"
			/>
			
			<IconTrash
				v-if="favourite"
				class="icon-trash"
				@click="favouriteStore.removeFavouriteMovie(movie)"
			/>
			<img
				v-if="type === 'movie'"
				:src="moviePoster"
				:alt="movie.original_title || movie.original_name"
				loading="lazy"
			/>
			<img
				v-if="type === 'person'"
				:src="personPoster"
				:alt="person.name"
				loading="lazy"
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
				<span>{{ formatDate }}</span>
			</div>

			<div v-if="type === 'person'">
				<h4>{{ person.name }}</h4>
				<span>{{ person.known_for[0].original_title || '' }}</span>
			</div>
		</div>
	</div>
</template>

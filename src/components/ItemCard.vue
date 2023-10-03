<script setup>
import { computed, ref } from 'vue'
import { useFavouritesStore } from '@/stores/moviesStore'

import { useToast } from "vue-toastification";
import { calcVoteColor } from '@/helpers/calcVoteColor'
import IconHeart from './IconHeart.vue'
import IconTrash from './IconTrash.vue'

const props = defineProps({
	movie: Object,
	person: Object,
	type: String,
	filmCard: Boolean,
	tvShowCard: Boolean,
	personCard: Boolean,
	favouriteCard: Boolean,
})

const favouriteStore = useFavouritesStore()
const addedToFavourite = ref()
const toast = useToast()

const formatDate = computed(() => {
	if (props.movie.release_date || props.movie.first_air_date) {
		const date = new Date(props.movie.release_date || props.movie.first_air_date)
		const options = { day: '2-digit', month: 'short', year: 'numeric' }
		return date.toLocaleDateString('eu', options)
	}
	return ''
})

const moviePoster = computed(() => {
	if (props.movie.poster_path !== null && props.movie.poster_path !== undefined) {
		return `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
	}
	return '../public/images/no-image.png'
})

const personPoster = computed(() => {
	if (props.person.profile_path !== null && props.person.profile_path !== undefined) {
		return `https://image.tmdb.org/t/p/w500/${props.person.profile_path}`
	}
	return '../public/images/no-image.png'
})

const personKnownFor = computed(() => {
	if (props.person.known_for) {
		return props.person.known_for[0].original_title
	} else {
		return props.person.character
	}
})

const favouriteColor = computed(() => {
	return favouriteStore.getFavouriteMovies.some((item) => item.id === props.movie.id) ? '#ff0000' : '#fff'
})

const handleAddFavourite = (movie) => {
	// console.log('add')
	// console.log(movie)
	addedToFavourite.value = favouriteStore.addFavouriteMovie(movie)
	// console.log(addedToFavourite.value)
	if (addedToFavourite.value) {
		toast.success(`${movie.original_title || movie.name} - Added to favourites`)
	} else {
		toast.error(`${movie.original_title || movie.name} - Removed from favourites`)
	}
}

</script>

<template>
	<div :class="['movie-card', { 'box-shadow': filmCard || tvShowCard || personCard || favouriteCard }]">
		<div>
			<IconHeart
				v-if="type === 'movie' && !favouriteCard"
				@click.prevent="handleAddFavourite(movie)"
				:color="favouriteColor"
				class="icon-heart"
				/>

			<IconTrash
				v-if="favouriteCard"
				class="icon-trash"
				@click.prevent="favouriteStore.removeFavouriteMovie(movie)"
			/>
			<img
				v-if="type === 'movie'"
				:src="moviePoster"
				:alt="movie.original_title || movie.original_name"
				loading="lazy"
			/>
			<img
				v-if="personCard"
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
				<div>
					<span class="icon-count">{{ (movie.vote_average * 10).toFixed() }}</span>
					<span class="icon-percentage">%</span>
				</div>
			</div>

			<div v-if="type === 'movie'">
				<h4>{{ movie.original_title || movie.name }}</h4>
				<span>{{ formatDate }}</span>
			</div>

			<div v-if="personCard">
				<h4>{{ person.name }}</h4>
				<span>{{ personKnownFor }}</span>
			</div>
		</div>
	</div>
</template>

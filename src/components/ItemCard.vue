<script setup>
import { computed } from 'vue'
import { useFavouritesStore } from '@/stores/useFavouritesStore'

import { calcVoteColor, toggleFavouriteMovie } from '@/helpers'
import IconHeart from './icons/IconHeart.vue'
import IconTrash from './icons/IconTrash.vue'

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

const movieAvgCount = computed(() => {
	// console.log(props.movie.vote_average)
	if( props.movie.vote_average === undefined) {
		return 0
	}
	return (props.movie.vote_average * 10).toFixed()
})

</script>

<template>
	<div :class="['movieCard', { 'box-shadow': filmCard || tvShowCard || personCard || favouriteCard }]">
		<div class="movieCard__icons">
			<IconHeart
				v-if="type === 'movie' && !favouriteCard"
				@click.prevent="toggleFavouriteMovie(movie)"
				:color="favouriteColor"
				class="movieCard__icons-heart"
			/>

			<IconTrash
				v-if="favouriteCard"
				class="movieCard__icons-trash"
				@click.prevent="toggleFavouriteMovie(movie, notToast = true)"
			/>
			<img
				v-if="type === 'movie'"
				:src="moviePoster"
				:alt="movie.title || movie.original_name"
				loading="lazy"
			/>
			<img
				v-if="personCard"
				:src="personPoster"
				:alt="person.name"
				loading="lazy"
			/>
		</div>
		<div class="movieCard__description">
			<div
				v-if="type === 'movie'"
				class="rating"
				:style="calcVoteColor((movie.vote_average * 10).toFixed())"
			>
				<div class="rating__content">
					<span class="rating__content-count">
						{{ movieAvgCount }}
					</span>
					<span class="rating__content-percentage">%</span>
				</div>
			</div>

			<div v-if="type === 'movie'">
				<h4>
					{{ movie.title || movie.name }}
				</h4>
				<span>
					{{ formatDate }}
				</span>
			</div>

			<div v-if="personCard">
				<h4>
					{{ person.name }}
				</h4>
				<span>
					{{ personKnownFor }}
				</span>
			</div>
		</div>
	</div>
</template>

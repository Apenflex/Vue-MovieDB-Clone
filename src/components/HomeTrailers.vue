<script setup>
import 'swiper/css'

import { ref, reactive, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import Modal from '@/components/Modal.vue'

const store = moviesStore()
const isModalOpen = ref(false)
const backgroundImage = ref('')
const trailerMovies = reactive({ data: store.trailerMovies, variant: 'now_playing' })
const trailerLinks = [
	{
		title: 'Наживо',
		popular: 'now_playing',
	},
	{
		title: 'На ТБ',
		popular: 'popular',
	},
	{
		title: 'Для прокату',
		popular: 'top_rated',
	},
	{
		title: 'У кінотеатрах',
		popular: 'upcoming',
	},
]

const changeSectionBackground = (image) => {
	backgroundImage.value = `https://image.tmdb.org/t/p/original${image}`
}

const handleToggleModal = (movieId) => {
	if (isModalOpen.value) {
		isModalOpen.value = false
	} else {
		isModalOpen.value = true
		store.setTrailerMovieUrl(movieId)
	}
}

const fetchTrailers = (argDay) => {
	trailerMovies.variant = argDay
	store.fetchTrailerMovies(argDay)
	trailerMovies.data = store.trailerMovies
}

onBeforeMount(() => {
	fetchTrailers('now_playing')
})
</script>

<template>
	<section
		class="trailers"
		:style="{
			background: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.8) 100%),
			url(${backgroundImage})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}"
	>
		<div class="trailers-tab">
			<h3>Останні трейлери</h3>
			<div class="trailers-tab__item">
				<h3
					v-for="link of trailerLinks"
					:key="link.title"
					:class="{ trailersActive: trailerMovies.variant === link.popular }"
					@click="fetchTrailers(link.popular)"
				>
					{{ link.title }}
				</h3>
			</div>
		</div>

		<div class="video">
			<swiper
				:slides-per-view="4"
				:space-between="30"
				:freeMode="true"
				:mousewheel="true"
				:modules="[Mousewheel, FreeMode]"
			>
				<swiper-slide
					v-for="movie in store.trailerMovies"
					:key="movie.id"
					@mouseover="changeSectionBackground(movie.backdrop_path)"
				>
					<div
						class="image"
						@click="handleToggleModal(movie.id)"
					>
						<img
							:src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
							alt="poster"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="45px"
							viewBox="0 0 384 512"
						>
							<path
								d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
								fill="#ffffff"
							/>
						</svg>
					</div>
					<!-- Title -->
					<h3>{{ movie.title }}</h3>
				</swiper-slide>
			</swiper>
		</div>
		<Modal
			v-if="isModalOpen"
			:movie="store.trailerMovieUrl"
			@toggle-modal="handleToggleModal()"
		/>
	</section>
</template>

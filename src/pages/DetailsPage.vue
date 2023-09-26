<script setup>
import { onBeforeMount, onMounted, computed, ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

import { moviesStore, useFavouritesStore } from '@/stores/moviesStore'
import Modal from '@/components/Modal.vue'
import IconHeart from '@/components/IconHeart.vue'

const store = moviesStore()
const favouriteStore = useFavouritesStore()
const router = useRouter()
const isModalOpen = ref(false)
const heartColor = ref('#fff')
const addedToFavourite = ref(false)

const detailsQuery = reactive({
	mediaType: router.currentRoute.value.params.mediaType,
	id: router.currentRoute.value.params.id,
})

const mediaDetailsPoster = computed(() => {
	return `https://image.tmdb.org/t/p/original/${store.mediaDetails.poster_path}`
})

const mediaDetailsRelease = computed(() => {
	const date =
		store.mediaDetails.release_date?.split('-').reverse().join('-') ||
		store.mediaDetails.first_air_date?.split('-').reverse().join('-')
	return date
})

const mediaDetailsGenres = computed(() => {
	return store.mediaDetails.genres?.map((genre) => genre.name).join(', ')
})

const mediaDetailsRuntime = computed(() => {
	if (!store.mediaDetails.runtime) return ''
	return `${Math.floor(store.mediaDetails.runtime / 60)}h ${store.mediaDetails.runtime % 60}m`
})

const favouriteColor = computed(() => {
	return favouriteStore.favouriteMovies.find((item) => item.id === store.mediaDetails.id) ? '#ff0000' : '#fff'
})

const calcVoteColor = (vote) => {
	switch (true) {
		case vote >= 70:
			return { border: '5px solid green' }
		case vote >= 50:
			return { border: '5px solid orange' }
		case vote >= 0:
			return { border: '5px solid red' }
		default:
			return { color: '#fff' }
	}
}

watch(favouriteStore.getFavouriteMovies, () => {
	heartColor.value = favouriteColor.value
})

const handleAddFavourite = (movie) => {
	console.log('DetailsPage', movie)
	addedToFavourite.value = true
	favouriteStore.addFavouriteMovie(movie)
	setTimeout(() => {
		addedToFavourite.value = false
	}, 3000)
}

const handleToggleModal = (movieId) => {
	if (isModalOpen.value) {
		isModalOpen.value = false
	} else {
		isModalOpen.value = true
		store.setTrailerMovieUrl(movieId)
	}
}

onBeforeMount(() => {
	store.fetchMediaDetails({ mediaType: detailsQuery.mediaType, id: detailsQuery.id })
})

onMounted(() => {
	heartColor.value = favouriteColor.value
})
</script>

<template>
	<section
		class="details"
		:style="{
			backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 40%), url(https://image.tmdb.org/t/p/original/${store.mediaDetails.poster_path})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}"
	>
		<div class="wrapper">
			<div class="image">
				<img
					:src="mediaDetailsPoster"
					:alt="store.mediaDetails.title"
				/>
			</div>
			<div class="content">
				<div class="head">
					<div class="block">
						<h2>{{ store.mediaDetails.title || store.mediaDetails.name }}</h2>
						<span>
							({{
								store.mediaDetails.release_date?.split('-')[0] || store.mediaDetails.first_air_date?.split('-')[0]
							}})
						</span>
					</div>
					<div class="facts">
						<span class="release">
							{{ mediaDetailsRelease }}
						</span>
						<span class="genres">
							{{ mediaDetailsGenres }}
						</span>
						<span class="runtime">
							{{ mediaDetailsRuntime }}
						</span>
					</div>
				</div>
				<div class="actions">
					<div class="rating">
						<div
							class="icon"
							:style="calcVoteColor((store.mediaDetails.vote_average * 10).toFixed())"
						>
							<span class="icon-count"> {{ (store.mediaDetails.vote_average * 10).toFixed() }}</span>
							<span class="icon-percentage"> % </span>
						</div>
						<div class="title">Оцінка користувачів</div>
					</div>
					<div class="block fixed">
						<div class="tooltip">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="1em"
								viewBox="0 0 512 512"
							>
								<path
									d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"
								/>
							</svg>
						</div>
						<div class="tooltip">
							<IconHeart
								@click.prevent="handleAddFavourite(store.mediaDetails)"
								:color="heartColor"
								:class="['icon-heart', { animate: addedToFavourite }]"
							/>
						</div>
						<div class="tooltip">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="1em"
								viewBox="0 0 384 512"
							>
								<path
									d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
								/>
							</svg>
						</div>
						<div class="tooltip">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="1em"
								viewBox="0 0 576 512"
							>
								<path
									d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
								/>
							</svg>
						</div>
					</div>
					<div
						class="play"
						@click="handleToggleModal(store.mediaDetails.id)"
					>
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="15px"
								viewBox="0 0 384 512"
							>
								<path
									d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
								/>
							</svg>
						</span>
						Відтворити тизер
					</div>
				</div>
				<div class="info">
					<h3 class="tagline">
						{{ store.mediaDetails.tagline }}
					</h3>
					<h3 class="title">Опис</h3>
					<p class="overview">
						{{ store.mediaDetails.overview }}
					</p>
				</div>
			</div>
		</div>
		<Modal
			v-if="isModalOpen"
			:movie="store.trailerMovieUrl"
			@toggle-modal="handleToggleModal()"
		/>
	</section>
</template>

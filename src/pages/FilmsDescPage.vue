<script setup>
import { onBeforeMount, onMounted, computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import { useFavouritesStore } from '@/stores/useFavouritesStore'
import { useI18n } from 'vue-i18n'
import { applyLocale } from '@/composables/useApplyLocale'
import { calcVoteColor, toggleFavouriteMovie } from '@/helpers'
import Modal from '@/components/modal/Modal.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const favouriteStore = useFavouritesStore()
const router = useRouter()
const { t, locale } = useI18n()

const isModalOpen = ref(false)

const mediaQuery = reactive({
	mediaType: router.currentRoute.value.params.mediaType,
	id: router.currentRoute.value.params.id,
})

const swiperBreakpoints = computed(() => {
	return {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		640: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		1024: {
			slidesPerView: 6,
		},
		1280: {
			slidesPerView: 7,
		},
	}
})

const mediaDetailsPoster = computed(() => {
	const posterPath = store.mediaDetails.data.poster_path
	return posterPath !== null && posterPath !== undefined
		? `https://image.tmdb.org/t/p/original/${posterPath}`
		: '../public/images/no-image.png'
})

const backgroundImage = computed(() => {
	const backdropPath = store.mediaDetails.data.backdrop_path
	const gradientColor1 = 'rgba(0, 0, 0, 0.5)'
	const gradientColor2 = 'rgba(0, 0, 0, 0.7)'

	if (backdropPath !== null && backdropPath !== undefined) {
		return {
			backgroundImage: `linear-gradient(to right, ${gradientColor1} 0%, ${gradientColor2} 40%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdropPath})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}
	} else {
		return {
			backgroundImage: `linear-gradient(to right, ${gradientColor1} 0%, ${gradientColor2} 40%), url('../public/images/no-image.png')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}
	}
})

const ratingCount = computed(() => {
	return (store.mediaDetails.data.vote_average * 10).toFixed()
})

const mediaDetailsRelease = computed(() => {
	const date =
		store.mediaDetails.data.release_date?.split('-').reverse().join('-') ||
		store.mediaDetails.data.first_air_date?.split('-').reverse().join('-')
	return date
})

const mediaDetailsGenres = computed(() => {
	return store.mediaDetails.data.genres?.map((genre) => genre.name).join(', ')
})

const mediaDetailsRuntime = computed(() => {
	if (!store.mediaDetails.data.runtime) return ''
	return `${Math.floor(store.mediaDetails.data.runtime / 60)}h ${store.mediaDetails.data.runtime % 60}m`
})

const favouriteColor = computed(() => {
	return favouriteStore.favouriteMovies.find((item) => item.id === store.mediaDetails.data.id) ? '#ff0000' : '#fff'
})

const handleToggleModal = () => (isModalOpen.value = !isModalOpen.value)

onBeforeMount(() => {
	store.fetchMediaDetails({ mediaType: mediaQuery.mediaType, id: mediaQuery.id, lang: locale.value })
})

onMounted(() => {
	// console.log(router.currentRoute.value.params, 'router.currentRoute.value.params')
	store.getMoviePersons({ mediaType: mediaQuery.mediaType, movieId: mediaQuery.id })
})
</script>

<template>
	<main>
		<section class="details">
			<div
				class="details__movie"
				:style="backgroundImage"
			>
				<div class="details__movie-image">
					<img
						:src="mediaDetailsPoster || '../public/images/no-image.png'"
						:alt="store.mediaDetails.data.title"
					/>
				</div>
				<div class="details__movie-content">
					<div class="head">
						<div class="head__title">
							<h2>{{ store.mediaDetails.data.title || store.mediaDetails.data.name }}</h2>
							<span v-if="store.mediaDetails.data.release_date || store.mediaDetails.data.first_air_date">
								({{
									store.mediaDetails.data.release_date?.split('-')[0] ||
									store.mediaDetails.data.first_air_date?.split('-')[0]
								}})
							</span>
						</div>
						<div class="head__facts">
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
						<div class="actions__rating">
							<div
								class="icon"
								:style="calcVoteColor((store.mediaDetails.data.vote_average * 10).toFixed())"
							>
								<div>
									<span class="icon-count"> {{ ratingCount }}</span>
									<span class="icon-percentage"> % </span>
								</div>
							</div>
							<div class="icon-title">
								{{ t('pages.FilmDesc.userscore') }}
							</div>
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
									@click.prevent="toggleFavouriteMovie(store.mediaDetails.data)"
									:color="favouriteColor"
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
							@click="handleToggleModal(store.mediaDetails.data.id)"
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
							{{ t('pages.FilmDesc.playtrailer') }}
						</div>
					</div>
					<div class="info">
						<h3 class="tagline">
							{{ store.mediaDetails.data.tagline }}
						</h3>
						<h3 class="title">
							{{ t('pages.FilmDesc.overview') }}
						</h3>
						<p class="overview">
							{{ store.mediaDetails.data.overview }}
						</p>
					</div>
				</div>
			</div>
			<div class="details__persons">
				<h2>
					{{ t('pages.FilmDesc.cast') }}
				</h2>
				<swiper
					:slides-per-view="7"
					:space-between="20"
					freeMode
					:mousewheel="{ forceToAxis: true }"
					:modules="[Mousewheel, FreeMode]"
					:breakpoints="swiperBreakpoints"
				>
					<swiper-slide
						v-for="person in store.mediaDetails.persons"
						:key="person.id"
					>
						<RouterLink
							:to="applyLocale(`/persons/${person.id}-${person.name.split(' ').join('-').toLowerCase()}`)"
						>
							<ItemCard
								:person="person"
								:personCard="true"
							/>
						</RouterLink>
					</swiper-slide>
				</swiper>
			</div>
			<Modal
				v-if="isModalOpen"
				:movie="{
					title: store.mediaDetails.data.original_title || store.mediaDetails.data.name,
					path: store.mediaDetails.data.trailer,
				}"
				@toggle-modal="handleToggleModal()"
			/>
		</section>
	</main>
</template>

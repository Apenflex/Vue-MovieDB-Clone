<script setup>
import { ref, reactive, onBeforeMount, computed } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'
import { moviesStore } from '@/stores/moviesStore'
import { useI18n } from 'vue-i18n'
import { calcTabActiveClass } from '@/helpers'
import Modal from '@/components/modal/Modal.vue'

const store = moviesStore()
const { t } = useI18n()

const isModalOpen = ref(false)
const backgroundImage = ref('')
const trailerMovies = reactive({
	data: store.trailerMovies.data,
	variant: { label: t('components.HomeTrailers.tab.streaming.label'), value: '' },
})

const selectOptions = [
	{
		label: t('components.HomeTrailers.tab.streaming.label'),
		value: t('components.HomeTrailers.tab.streaming.value'),
	},
	{
		label: t('components.HomeTrailers.tab.onTv.label'),
		value: t('components.HomeTrailers.tab.onTv.value'),
	},
	{
		label: t('components.HomeTrailers.tab.forRent.label'),
		value: t('components.HomeTrailers.tab.forRent.value'),
	},
	{
		label: t('components.HomeTrailers.tab.inTheaters.label'),
		value: t('components.HomeTrailers.tab.inTheaters.value'),
	},
]

const swiperBreakpoints = computed(() => {
	return {
		320: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 2,
		},
		993: {
			slidesPerView: 3,
		},
		1280: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		1600: {
			slidesPerView: 5,
			spaceBetween: 30,
		},
	}
})

const changeSectionBackground = (image) => {
	backgroundImage.value = `https://image.tmdb.org/t/p/original/${image}`
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
	trailerMovies.variant.value = argDay
	store.fetchTrailerMovies(argDay)
	trailerMovies.data = store.trailerMovies.data
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
		<div class="trailers__wrapper">
			<h2>
				{{ t('components.HomeTrailers.tab.title') }}
			</h2>
			<div class="trailers__tab">
				<!-- Desktop Select -->
				<h3
					:class="calcTabActiveClass(trailerMovies, t('components.HomeTrailers.tab.streaming.value'))"
					@click="fetchTrailers(t('components.HomeTrailers.tab.streaming.value'))"
				>
					{{ t('components.HomeTrailers.tab.streaming.label') }}
				</h3>
				<h3
					:class="calcTabActiveClass(trailerMovies, t('components.HomeTrailers.tab.onTv.value'))"
					@click="fetchTrailers(t('components.HomeTrailers.tab.onTv.value'))"
				>
					{{ t('components.HomeTrailers.tab.onTv.label') }}
				</h3>
				<h3
					:class="calcTabActiveClass(trailerMovies, t('components.HomeTrailers.tab.forRent.value'))"
					@click="fetchTrailers(t('components.HomeTrailers.tab.forRent.value'))"
				>
					{{ t('components.HomeTrailers.tab.forRent.label') }}
				</h3>
				<h3
					:class="calcTabActiveClass(trailerMovies, t('components.HomeTrailers.tab.inTheaters.value'))"
					@click="fetchTrailers(t('components.HomeTrailers.tab.inTheaters.value'))"
				>
					{{ t('components.HomeTrailers.tab.inTheaters.label') }}
				</h3>
			</div>

			<!-- Mobile Select -->
			<VueMultiselect
				v-model="trailerMovies.variant"
				:options="selectOptions"
				:searchable="false"
				hide-selected
				close-on-select
				openDirection="bottom"
				label="label"
				track-by="value"
				selectLabel=""
				@select="fetchTrailers(trailerMovies.variant.value)"
			/>
		</div>

		<div class="video">
			<swiper
				:slides-per-view="4"
				:space-between="30"
				freeMode
				:mousewheel="{ forceToAxis: true }"
				:modules="[Mousewheel, FreeMode]"
				:breakpoints="swiperBreakpoints"
			>
				<swiper-slide
					v-for="movie in store.trailerMovies.data"
					:key="movie.id"
					@mouseover="changeSectionBackground(movie.backdrop_path)"
				>
					<div
						class="image"
						@click="handleToggleModal(movie.id)"
					>
						<img
							:src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
							:alt="movie.title"
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
					<h3>
						{{ movie.title }}
					</h3>
				</swiper-slide>
			</swiper>
		</div>
		<Modal
			v-if="isModalOpen"
			:movie="store.trailerMovies.url"
			@toggle-modal="handleToggleModal()"
		/>
	</section>
</template>

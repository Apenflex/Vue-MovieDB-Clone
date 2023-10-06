<script setup>
import { reactive, computed, onBeforeMount } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'
import { moviesStore } from '@/stores/moviesStore'
import { useI18n } from 'vue-i18n'
import { calcTabActiveClass } from '@/helpers'
import ItemCard from './ItemCard.vue'

const store = moviesStore()
const { t } = useI18n()

const popularMovies = reactive({
	data: store.trandingMovies,
	variant: { label: t('components.HomePopular.tab.streaming.label'), value: '' },
})

const selectOptions = [
	{
		label: t('components.HomePopular.tab.streaming.label'),
		value: t('components.HomePopular.tab.streaming.value'),
	},
	{
		label: t('components.HomePopular.tab.onTv.label'),
		value: t('components.HomePopular.tab.onTv.value'),
	},
	{
		label: t('components.HomePopular.tab.forRent.label'),
		value: t('components.HomePopular.tab.forRent.value'),
	},
	{
		label: t('components.HomePopular.tab.inTheaters.label'),
		value: t('components.HomePopular.tab.inTheaters.value'),
	},
]

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

const fetchPopular = (argDay) => {
	popularMovies.variant.value = argDay
	store.fetchPopularMovies(argDay)
	popularMovies.data = store.popularMovies
}

onBeforeMount(() => {
	fetchPopular('now_playing')
})
</script>

<template>
	<section class="popular container">
		<div class="popular__wrapper">
			<h2>
				{{ t('components.HomePopular.tab.title') }}
			</h2>
			<!-- Desktop Select -->
			<div class="popular__tab">
				<h3
					:class="calcTabActiveClass(popularMovies, t('components.HomePopular.tab.streaming.value'))"
					@click="fetchPopular(t('components.HomeTrailers.tab.streaming.value'))"
				>
					{{ t('components.HomePopular.tab.streaming.label') }}
				</h3>
				<h3
					:class="calcTabActiveClass(popularMovies, t('components.HomePopular.tab.onTv.value'))"
					@click="fetchPopular(t('components.HomeTrailers.tab.onTv.value'))"
				>
					{{ t('components.HomePopular.tab.onTv.label') }}
				</h3>
				<h3
					:class="calcTabActiveClass(popularMovies, t('components.HomePopular.tab.forRent.value'))"
					@click="fetchPopular(t('components.HomeTrailers.tab.forRent.value'))"
				>
					{{ t('components.HomePopular.tab.forRent.label') }}
				</h3>
				<h3
					:class="calcTabActiveClass(popularMovies, t('components.HomePopular.tab.inTheaters.value'))"
					@click="fetchPopular(t('components.HomeTrailers.tab.inTheaters.value'))"
				>
					{{ t('components.HomePopular.tab.inTheaters.label') }}
				</h3>
			</div>
			<!-- Mobile Select -->
			<VueMultiselect
				v-model="popularMovies.variant"
				:options="selectOptions"
				:searchable="false"
				hide-selected
				close-on-select
				openDirection="bottom"
				label="label"
				track-by="value"
				selectLabel=""
				@select="fetchPopular(popularMovies.variant.value)"
			/>
		</div>

		<!-- Slider -->
		<div>
			<swiper
				:slides-per-view="7"
				:space-between="20"
				freeMode
				:mousewheel="{ forceToAxis: true }"
				:modules="[Mousewheel, FreeMode]"
				:breakpoints="swiperBreakpoints"
			>
				<swiper-slide
					v-for="movie in store.popularMovies"
					:key="movie.id"
				>
					<RouterLink
						:to="{
							name: 'media-details',
							params: { mediaType: 'movie', id: movie.id },
						}"
					>
						<ItemCard
							:movie="movie"
							type="movie"
						/>
					</RouterLink>
				</swiper-slide>
			</swiper>
		</div>
	</section>
</template>

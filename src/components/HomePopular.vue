<script setup>
import { reactive, computed, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from './ItemCard.vue'

const store = moviesStore()
const popularMovies = reactive({
	data: store.trandingMovies,
	variant: { label: 'Наживо', value: '' },
})
const popularLinks = [
	{
		title: 'Наживо',
		value: 'now_playing',
	},
	{
		title: 'На ТБ',
		value: 'popular',
	},
	{
		title: 'Для прокату',
		value: 'top_rated',
	},
	{
		title: 'У кінотеатрах',
		value: 'upcoming',
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
			<h2>Що популярне</h2>
			<!-- Desktop Select -->
			<div class="popular__tab">
				<h3
					v-for="link of popularLinks"
					:key="link.title"
					:class="{ active: popularMovies.variant.value === link.value }"
					@click="fetchPopular(link.value)"
				>
					{{ link.title }}
				</h3>
			</div>
			<!-- Mobile Select -->
			<VueMultiselect
				v-model="popularMovies.variant"
				:options="[
					{
						label: 'Наживо',
						value: 'now_playing',
					},
					{
						label: 'На ТБ',
						value: 'popular',
					},
					{
						label: 'Для прокату',
						value: 'top_rated',
					},
					{
						label: 'У кінотеатрах',
						value: 'upcoming',
					},
				]"
				:searchable="false"
				hide-selected
				close-on-select
				openDirection="bottom"
				label="label"
				track-by="value"
				@select="fetchPopular(popularMovies.variant.value)"
				selectLabel=""
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

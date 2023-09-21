<script setup>
import 'swiper/css'

import { reactive, onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from './ItemCard.vue'

const store = moviesStore()
const popularMovies = reactive({ data: store.trandingMovies, popular: 'now_playing' })
const popularLinks = [
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

const fetchPopular = (argDay) => {
	popularMovies.popular = argDay
	store.fetchPopularMovies(argDay)
	popularMovies.data = store.popularMovies
}

onBeforeMount(() => {
	fetchPopular('now_playing')
})
</script>

<template>
	<section class="popular container">
		<div class="tabs">
			<h2>Що популярне</h2>
			<!-- Desktop Select -->
			<div class="item">
				<h3
					v-for="link of popularLinks"
					:key="link.title"
					:class="{ active: popularMovies.popular === link.popular }"
					@click="fetchPopular(link.popular)"
				>
					{{ link.title }}
				</h3>
			</div>
			<!-- Mobile Select -->
			<Dropdown
				v-model="popularMovies.popular"
				:options="[
					{ name: 'Наживо', value: 'now_playing' },
					{ name: 'На ТБ', value: 'popular' },
					{ name: 'Для прокату', value: 'top_rated' },
					{ name: 'У кінотеатрах', value: 'upcoming' },
				]"
				optionValue="value"
				optionLabel="name"
				:selected="popularMovies.popular"
				@change="fetchPopular(popularMovies.popular)"
				class="mobile"
			/>
		</div>

		<div>
			<swiper
				:slides-per-view="7"
				:space-between="20"
				:freeMode="true"
				:mousewheel="true"
				:modules="[Mousewheel, FreeMode]"
				:breakpoints="{
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
				}"
			>
				<swiper-slide
					v-for="movie in store.popularMovies"
					:key="movie.id"
				>
					<RouterLink :to="{ name: 'item-details', params: { mediaType: 'movie', id: movie.id } }">
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

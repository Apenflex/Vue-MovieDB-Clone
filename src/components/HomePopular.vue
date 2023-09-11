<script setup>
import 'swiper/css'

import { reactive, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import MovieCard from './MovieCard.vue'

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
	<section class="popular">
		<div class="popular-tab">
			<h3>Що популярне</h3>
			<div class="popular-tab__item">
				<h3
					v-for="link of popularLinks"
					:key="link.title"
					:class="{ popularActive: popularMovies.popular === link.popular }"
					@click="fetchPopular(link.popular)"
				>
					{{ link.title }}
				</h3>
			</div>
		</div>

		<div>
			<swiper
				:slides-per-view="7"
				:space-between="20"
				:freeMode="true"
				:mousewheel="true"
				:modules="[Mousewheel, FreeMode]"
			>
				<swiper-slide
						v-for="movie in store.popularMovies"
						:key="movie.id"
					>
						<MovieCard :movie="movie" />
					</swiper-slide>
			</swiper>
		</div>
	</section>
</template>

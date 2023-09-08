<script setup>
import { reactive, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { moviesStore } from '@/stores/moviesStore'
import MovieCard from './MovieCard.vue'

const popularLinks = [
	{
		title: 'Наживо',
		popular: 'day',
	},
	{
		title: 'На ТБ',
		popular: '1',
	},
	{
		title: 'Для прокату',
		popular: '2',
	},
	{
		title: 'У кінотеатрах',
		popular: '3',
	},
]

const store = moviesStore()
const popularMovies = reactive({ data: store.trandingMovies }, { popular: 'day' })

const fetchTrends = (argDay) => {
	// console.log('fetchTrends', argDay)
	popularMovies.popular = argDay
	// store.fetchTrandingMovies(argDay)
	// activeMovies.data = store.trandingMoviesNow
}

onMounted(() => {
	// console.log('onMounted')
	fetchTrends('day')
})
</script>

<template>
	<section>
		<div class="trend-wrapper">
			<div class="trend-block">
				<h3 class="trend-block-title">Що популярне</h3>
				<div class="trend-block-name">
					<h3
						v-for="link of popularLinks"
						:key="link.title"
						:class="['trend-block-name-title', { trendActive: popularMovies.popular === link.popular }]"
						@click="fetchTrends(link.popular)"
					>
						{{ link.title }}
					</h3>
					<!-- <h3
						class="trend-block-name-title"
						:class="{ trendActive: activeMovies.trend === 'day' }"
						@click="() => fetchTrends('day')"
					>
						Наживо
					</h3>
					<h3
						class="trend-block-name-title"
						:class="{ trendActive: activeMovies.trend === 'week' }"
						@click="() => fetchTrends('week')"
					>
						На ТБ
					</h3>
					<h3
						class="trend-block-name-title"
						:class="{ trendActive: activeMovies.trend === 'week' }"
						@click="() => fetchTrends('week')"
					>
						Для прокату
					</h3>
					<h3
						class="trend-block-name-title"
						:class="{ trendActive: activeMovies.trend === 'week' }"
						@click="() => fetchTrends('week')"
					>
						У кінотеатрах
					</h3> -->
				</div>
			</div>

			<div class="trend-slider">
				<swiper
					:slides-per-view="7"
					:space-between="20"
				>
					<!-- <swiper-slide
						v-for="movie in store.trandingMovies"
						:key="movie.id"
					>
						<MovieCard :movie="movie" />
					</swiper-slide> -->
				</swiper>
			</div>
		</div>
	</section>
</template>

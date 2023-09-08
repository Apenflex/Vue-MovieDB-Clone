<script setup>
import 'swiper/css'

import { reactive, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { moviesStore } from '@/stores/moviesStore'
import MovieCard from './MovieCard.vue'

const store = moviesStore()
const activeMovies = reactive({ data: store.trandingMovies }, { trend: 'day' })

const fetchTrends = async (argDay) => {
	activeMovies.trend = argDay
	await store.fetchTrandingMovies(argDay)
	activeMovies.data = store.trandingMoviesNow
	// console.log(store.trandingMovies)
}

onBeforeMount(() => {
	fetchTrends('day')
})
</script>

<template>
	<section>
		<div class="trend-wrapper">
			<div class="trend-block">
				<h3 class="trend-block-title">У тренді</h3>
				<div class="trend-block-name">
					<h3
						class="trend-block-name-title"
						:class="{ trendActive: activeMovies.trend === 'day' }"
						@click="() => fetchTrends('day')"
					>
						Сьогодні
					</h3>
					<h3
						class="trend-block-name-title"
						:class="{ trendActive: activeMovies.trend === 'week' }"
						@click="() => fetchTrends('week')"
					>
						Цього тижня
					</h3>
				</div>
			</div>

			<div class="trend-slider">
				<swiper
					:slides-per-view="7"
					:space-between="20"
				>
					<swiper-slide
						v-for="movie in store.trandingMovies"
						:key="movie.id"
					>
						<MovieCard :movie="movie" />
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</section>
</template>

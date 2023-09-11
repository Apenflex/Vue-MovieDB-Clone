<script setup>
import 'swiper/css'

import { reactive, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import MovieCard from './MovieCard.vue'

const store = moviesStore()
const activeMovies = reactive({ data: store.trandingMovies, trend: 'day' })

const fetchTrends = async (argDay) => {
	activeMovies.trend = argDay
	await store.fetchTrandingMovies(argDay)
	activeMovies.data = store.trandingMoviesNow
}

onBeforeMount(() => {
	fetchTrends('day')
})
</script>

<template>
	<section class="trend">
		<div class="trend-tab">
			<h3>У тренді</h3>
			<div class="trend-tab__item">
				<h3
					:class="{ trendActive: activeMovies.trend === 'day' }"
					@click="() => fetchTrends('day')"
				>
					Сьогодні
				</h3>
				<h3
					:class="{ trendActive: activeMovies.trend === 'week' }"
					@click="() => fetchTrends('week')"
				>
					Цього тижня
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
					v-for="movie in store.trandingMovies"
					:key="movie.id"
				>
					<MovieCard :movie="movie" />
				</swiper-slide>
			</swiper>
		</div>
	</section>
</template>

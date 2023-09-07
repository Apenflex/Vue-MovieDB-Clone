<script setup>
import { reactive, onMounted } from 'vue'
import { moviesStore } from '@/stores/moviesStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const store = moviesStore()
const activeMovies = reactive({ data: store.trandingMovies }, { trend: 'day' })
// console.log(activeMovies)

const fetchTrends = (argDay) => {
	activeMovies.trend = argDay
	store.fetchTrandingMovies(argDay)
	activeMovies.data = store.trandingMoviesNow
}

const formatDate = (dateString) => {
	if (dateString) {
		const date = new Date(dateString)
		const options = { day: '2-digit', month: 'short', year: 'numeric' }
		return date.toLocaleDateString('eu', options)
	}
	return ''
}

onMounted(() => {
	fetchTrends('day')
})
</script>

<template>
	<section>
		<div class="trend-wrapper">
			<div class="trend-block">
				<h3 class="trend-block-title"> У тренді </h3>
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
						<div class="trend-slide">
							<img
								:src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
								alt="slide"
							/>
							<div class="trend-names-block">
								<span>{{ movie.original_title || movie.original_name }}</span>
								<span>{{ formatDate(movie.release_date || movie.first_air_date) }}</span>
							</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</section>
</template>

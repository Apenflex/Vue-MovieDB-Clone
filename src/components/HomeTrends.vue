<script setup>
import 'swiper/css'

import { reactive, onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from './ItemCard.vue'

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
	<section class="trend container">
		<div class="tabs">
			<h2>У тренді</h2>
			<!-- Descktop Select -->
			<div class="item">
				<h3
					:class="{ active: activeMovies.trend === 'day' }"
					@click="() => fetchTrends('day')"
				>
					Сьогодні
				</h3>
				<h3
					:class="{ active: activeMovies.trend === 'week' }"
					@click="() => fetchTrends('week')"
				>
					Цього тижня
				</h3>
			</div>

			<!-- Mobile Select -->
			<Dropdown
				v-model="activeMovies.trend"
				:options="[
					{ name: 'Сьогодні', value: 'day' },
					{ name: 'Цього тижня', value: 'week' },
				]"
				optionValue="value"
				optionLabel="name"
				placeholder="Сьогодні"
				@change="fetchTrends(activeMovies.trend)"
				class="mobile"
			/>
		</div>

		<!-- Item Card -->
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
					v-for="movie in store.trandingMovies"
					:key="movie.id"
				>
					<RouterLink :to="{ name: 'item-details', params: { mediaType: movie.media_type, id: movie.id } }">
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

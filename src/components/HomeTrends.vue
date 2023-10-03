<script setup>
import { reactive, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from './ItemCard.vue'

const store = moviesStore()
const activeMovies = reactive({ data: store.trandingMovies, variant: {label: 'Сьогодні', value: '' } })

const fetchTrends = async (argDay) => {
	activeMovies.variant.value = argDay
	await store.fetchTrandingMovies(argDay)
	activeMovies.data = store.trandingMoviesNow
}

onBeforeMount(() => {
	fetchTrends('day')
})
</script>

<template>
	<section class="trend container">
		<div class="trend__wrapper">
			<h2>У тренді</h2>
			<!-- Descktop Select -->
			<div class="trend__tabs">
				<h3
					:class="{ active: activeMovies.variant.value === 'day' }"
					@click="() => fetchTrends('day')"
				>
					Сьогодні
				</h3>
				<h3
					:class="{ active: activeMovies.variant.value === 'week' }"
					@click="() => fetchTrends('week')"
				>
					Цього тижня
				</h3>
			</div>

			<!-- Mobile Select -->
			<VueMultiselect
				v-model="activeMovies.variant"
				:options="[
					{
						label: 'Сьогодні',
						value: 'day',
					},
					{
						label: 'Цього тижня',
						value: 'week',
					},
				]"
				:searchable="false"
				:hide-selected="true"
				:close-on-select="true"
				openDirection="bottom"
				label="label"
				track-by="value"
				@select="fetchTrends(activeMovies.variant.value)"
				placeholder="Сортувати за"
				selectLabel=""
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
					<RouterLink :to="{ name: 'media-details', params: { mediaType: movie.media_type, id: movie.id } }">
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

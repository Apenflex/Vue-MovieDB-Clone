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
const activeMovies = reactive({
	data: store.trandingMovies,
	variant: { label: t('components.HomeTrends.tab.day.label'), value: '' },
})

const selectOptions = [
	{
		label: t('components.HomeTrends.tab.day.label'),
		value: t('components.HomeTrends.tab.day.value'),
	},
	{
		label: t('components.HomeTrends.tab.week.label'),
		value: t('components.HomeTrends.tab.week.value'),
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
			<h2>
				{{ t('components.HomeTrends.tab.title') }}
			</h2>
			<!-- Descktop Select -->
			<div class="trend__tabs">
				<h3
					:class="calcTabActiveClass(activeMovies, t('components.HomeTrends.tab.day.value'))"
					@click="fetchTrends('day')"
				>
					{{ t('components.HomeTrends.tab.day.label') }}
				</h3>
				<h3
					:class="calcTabActiveClass(activeMovies, t('components.HomeTrends.tab.week.value'))"
					@click="fetchTrends('week')"
				>
					{{ t('components.HomeTrends.tab.week.label') }}
				</h3>
			</div>

			<!-- Mobile Select -->
			<VueMultiselect
				v-model="activeMovies.variant"
				:options="selectOptions"
				:searchable="false"
				hide-selected
				close-on-select
				openDirection="bottom"
				label="label"
				track-by="value"
				selectLabel=""
				@select="fetchTrends(activeMovies.variant.value)"
			/>
		</div>

		<!-- Item Card -->
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
					v-for="movie in store.trandingMovies"
					:key="movie.id"
				>
					<RouterLink
						:to="{
							name: 'media-details',
							params: { mediaType: movie.media_type, id: movie.id },
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

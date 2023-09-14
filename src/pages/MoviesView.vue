<script setup>
import { onBeforeMount, ref, watch } from 'vue'

import { moviesStore } from '@/stores/moviesStore'
import { delay } from '@/composables/delay'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()

const isFilterPanelOpen = ref(false)
const isFilterSearchBtnOpen = ref(false)
const isLoading = ref(false)
const currentPage = ref(1)

watch(
	() => store.moviesSortBy,
	() => {
		isFilterSearchBtnOpen.value = true
	},
)

const handleFilterSearch = () => {
	store.MoviesSortBy()
	isFilterSearchBtnOpen.value = false
}

const handleLoadMore = async () => {
	currentPage.value++
	isLoading.value = true
	await delay(4000)
	store.fetchMoviesMore(currentPage.value)
	isLoading.value = false
}

onBeforeMount(() => {
	store.fetchMovies()
})
</script>

<template>
	<main class="container">
		<section class="movies">
			<h2>Популярні фільми</h2>
			<div class="content">
				<!-- Filters -->
				<div class="filter-panel">
					<div
						class="name"
						@click="() => (isFilterPanelOpen = !isFilterPanelOpen)"
					>
						<h2>Сортування</h2>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 320 512"
						>
							<path
								d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
							/>
						</svg>
					</div>
					<div
						class="filter"
						:class="{ closed: !isFilterPanelOpen }"
					>
						<h3>Сортувати результати за</h3>
						<span>
							<select v-model="store.moviesSortBy">
								<option value="popularAsc">Непопулярні</option>
								<option value="voteDesc">Рейтинг високий</option>
								<option value="voteAsc">Рейтинг низький</option>
								<option value="releaseDesc">Реліз свіжий</option>
								<option value="releaseAsc">Реліз давній</option>
								<option value="titleAsc">Назва (А - Я)</option>
							</select>
						</span>
					</div>
				</div>
				<div class="items-wrapper">
					<div class="items">
						<ItemCard
							v-for="movie in store.getMovies"
							:key="movie.id"
							:movie="movie"
							:type="'movie'"
						/>
					</div>
					<!-- Pagination Button -->
					<div
						class="pagination"
						:class="{ loading: isLoading }"
						@click="handleLoadMore"
					>
						<p>Завантажити більше</p>
					</div>
					<!-- Filters Search Button -->
					<div
						v-if="isFilterSearchBtnOpen"
						class="pagination fixed"
						@click="handleFilterSearch"
					>
						<p>Шукати</p>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

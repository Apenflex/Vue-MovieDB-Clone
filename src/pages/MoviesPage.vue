<script setup>
import { onBeforeMount, ref, reactive, watch } from 'vue'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()

const filter = reactive({ panelOpen: false, searchBtnOpen: false, sortBy: 'popularAsc' })
const isLoading = ref(false)
const currentPage = ref(1)
watch(filter, () => {
	console.log(filter.sortBy)
})
const handleFilterSearch = () => {
	store.MoviesSortBy(filter.sortBy)
	filter.searchBtnOpen = false
}

const handleLoadMore = async () => {
	currentPage.value++
	isLoading.value = true
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
			<h1>Популярні фільми</h1>
			<div class="content">
				<!-- Filters -->
				<div class="filter-panel">
					<div
						class="name"
						@click="filter.panelOpen = !filter.panelOpen"
					>
						<h2>Сортування</h2>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 320 512"
							:class="{ rotate: filter.panelOpen }"
						>
							<path
								d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
							/>
						</svg>
					</div>
					<div
						class="filter"
						:class="{ closed: !filter.panelOpen }"
					>
						<h3>Сортувати результати за</h3>
						<!-- value="['Непопулярні', 'Рейтинг високий', 'Рейтинг низький', 'Реліз свіжий', 'Реліз давній', 'Назва (А - Я)']"
						:options="['popularAsc', 'voteDesc', 'voteAsc', 'releaseDesc', 'releaseAsc', 'titleAsc']" -->
						<VueMultiselect
							v-model="filter.sortBy"
							:options="[
								{
									label: 'Непопулярні',
									value: 'popularAsc',
								},
								{
									label: 'Рейтинг високий',
									value: 'voteDesc',
								},
								{
									label: 'Рейтинг низький',
									value: 'voteAsc',
								},
								{
									label: 'Реліз свіжий',
									value: 'releaseDesc',
								},
								{
									label: 'Реліз давній',
									value: 'releaseAsc',
								},
								{
									label: 'Назва (А - Я)',
									value: 'titleAsc',
								},
							]"
							:searchable="false"
							:hide-selected="true"
							openDirection="bottom"
							label="label"
							track-by="value"
							
							@select="filter.searchBtnOpen = true"
							placeholder="Сортувати за"
							selectLabel=""
						/>
						<!-- </VueMultiselect> -->
						<!-- <select v-model="store.moviesSortBy">
							<option value="popularAsc">Непопулярні</option>
							<option value="voteDesc">Рейтинг високий</option>
							<option value="voteAsc">Рейтинг низький</option>
							<option value="releaseDesc">Реліз свіжий</option>
							<option value="releaseAsc">Реліз давній</option>
							<option value="titleAsc">Назва (А - Я)</option>
						</select> -->
					</div>
				</div>
				<div class="items-wrapper">
					<div class="items">
						<ItemCard
							v-for="movie in store.getMovies"
							:key="movie.id"
							:movie="movie"
							type="movie"
						/>
					</div>

					<!-- Pagination Button -->
					<button
						class="pagination"
						:class="{ loading: isLoading }"
						@click="handleLoadMore"
					>
						Завантажити більше
					</button>

					<!-- Filters Search Button -->
					<button
						v-if="filter.searchBtnOpen"
						class="pagination fixed"
						@click="handleFilterSearch"
					>
						Шукати
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

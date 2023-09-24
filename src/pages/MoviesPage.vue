<script setup>
import { onBeforeMount, ref, reactive, watch } from 'vue'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()

const filter = reactive({ panelOpen: false, searchBtnOpen: false, sortBy: { value: 'popularAsc' } })
const isLoading = ref(false)
const currentPage = ref(1)
watch(filter, () => {
	console.log(filter.sortBy.value)
})
const handleFilterSearch = () => {
	store.MoviesSortBy(filter.sortBy.value)
	filter.searchBtnOpen = false
}

const handleLoadMore = async () => {
	currentPage.value++
	isLoading.value = true
	store.fetchMoviesMore({page: currentPage.value, sortBy: filter.sortBy.value})
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
					<!-- Filter Panel -->
					<div
						class="filter"
						:class="{ closed: !filter.panelOpen }"
					>
						<h3>Сортувати результати за</h3>
						<!-- TODO: Default select value -->
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
					</div>
				</div>
				<!-- Item Cards -->
				<div class="items-wrapper">
					<TransitionGroup
						tag="div"
						name="fade"
						class="items"
					>
						<ItemCard
							v-for="movie in store.getMovies"
							:key="movie.id"
							:movie="movie"
							type="movie"
						/>
					</TransitionGroup>

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

<script setup>
import { onBeforeMount, ref, reactive } from 'vue'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()

const filter = reactive({
	panelOpen: false,
	searchBtnOpen: false,
	sortBy: { label: 'Популярні', value: 'popularAsc' },
})
const isLoading = ref(false)
const currentPage = ref(1)

const handleFilterSearch = () => {
	store.TvShowsSortBy(filter.sortBy.value)
	filter.searchBtnOpen = false
}

const handleLoadMore = async () => {
	currentPage.value++
	isLoading.value = true
	store.fetchTvShowsMore({ page: currentPage.value, sortBy: filter.sortBy.value })
	isLoading.value = false
}

onBeforeMount(() => {
	store.fetchTvShows()
})
</script>

<template>
	<main class="container">
		<section class="tvshows">
			<h1>Популярні фільми</h1>
			<div class="tvshows__wrapper">
				<!-- Filters -->
				<div class="tvshows__filter">
					<div
						class="block-title"
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
						class="tvshows__filter-panel"
						:class="{ closed: !filter.panelOpen }"
					>
						<h3>Сортувати результати за</h3>
						<VueMultiselect
							v-model="filter.sortBy"
							:options="[
								{
									label: 'Популярні',
									value: 'popularAsc',
								},
								{
									label: 'Непопулярні',
									value: 'popularDesc',
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
							hide-selected
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
				<div class="tvshows__content">
					<TransitionGroup
						tag="div"
						name="fade"
						class="tvshows__content-items"
					>
						<RouterLink
							:to="{
								name: 'media-details',
								params: { mediaType: 'tv', id: movie.id },
							}"
							v-for="movie in store.getTvShows"
							:key="movie.id"
						>
							<ItemCard
								:movie="movie"
								type="movie"
								:tvShowCard="true"
							/>
						</RouterLink>
					</TransitionGroup>
					<!-- Pagination Button -->
					<button
						class="tvshows__content-loadMore"
						:class="{ loading: isLoading }"
						@click="handleLoadMore"
					>
						Завантажити більше
					</button>
					<!-- Filters Search Button -->
					<button
						v-if="filter.searchBtnOpen"
						class="tvshows__content-loadMore fixed"
						@click="handleFilterSearch"
					>
						Шукати
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

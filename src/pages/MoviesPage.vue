<script setup>
import { onBeforeMount, ref, reactive } from 'vue'

import { moviesStore } from '@/stores/moviesStore'
import { useI18n } from 'vue-i18n'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const { t } = useI18n()

const currentPage = ref(1)
const filter = reactive({
	panelOpen: false,
	searchBtnOpen: false,
	sortBy: {
		label: t('pages.Movies.Filter.options.popularity.label'),
		value: t('pages.Movies.Filter.options.popularity.value'),
	},
})

const selectOptions = [
	{
		label: t('pages.Movies.Filter.options.popularity.label'),
		value: t('pages.Movies.Filter.options.popularity.value'),
	},
	{
		label: t('pages.Movies.Filter.options.popularDesc.label'),
		value: t('pages.Movies.Filter.options.popularDesc.value'),
	},
	{
		label: t('pages.Movies.Filter.options.voteDesc.label'),
		value: t('pages.Movies.Filter.options.voteDesc.value'),
	},
	{
		label: t('pages.Movies.Filter.options.voteAsc.label'),
		value: t('pages.Movies.Filter.options.voteAsc.value'),
	},
	{
		label: t('pages.Movies.Filter.options.releaseDesc.label'),
		value: t('pages.Movies.Filter.options.releaseDesc.value'),
	},
	{
		label: t('pages.Movies.Filter.options.releaseAsc.label'),
		value: t('pages.Movies.Filter.options.releaseAsc.value'),
	},
	{
		label: t('pages.Movies.Filter.options.titleAsc.label'),
		value: t('pages.Movies.Filter.options.titleAsc.value'),
	},
]

const handleFilterSearch = () => {
	store.MoviesSortBy(filter.sortBy.value)
	filter.searchBtnOpen = false
}

const handleLoadMore = () => {
	currentPage.value++
	store.fetchMoviesMore({ page: currentPage.value, sortBy: filter.sortBy.value })
}

// onMounted(() => console.log(locale.value))

onBeforeMount(() => {
	store.fetchMovies()
})
</script>

<template>
	<main class="container">
		<section class="movies">
			<h1>
				{{ t('pages.Movies.H1') }}
			</h1>
			<div class="movies__wrapper">
				<!-- Filters -->
				<div class="movies__filter">
					<div
						class="block-title"
						@click="filter.panelOpen = !filter.panelOpen"
					>
						<h2>
							{{ t('pages.Movies.Filter.title') }}
						</h2>
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
						class="movies__filter-panel"
						:class="{ closed: !filter.panelOpen }"
					>
						<h3>
							{{ t('pages.Movies.Filter.sortBy') }}
						</h3>
						<VueMultiselect
							v-model="filter.sortBy"
							:options="selectOptions"
							:searchable="false"
							hide-selected
							openDirection="bottom"
							label="label"
							track-by="value"
							selectLabel=""
							@select="filter.searchBtnOpen = true"
						/>
					</div>
				</div>
				<!-- Item Cards -->
				<div class="movies__content">
					<TransitionGroup
						tag="div"
						name="fade"
						class="movies__content-items"
					>
						<RouterLink
							:to="{
								name: 'media-details',
								params: { mediaType: 'movie', id: movie.id },
							}"
							v-for="movie in store.getMovies"
							:key="movie.id"
						>
							<ItemCard
								:movie="movie"
								type="movie"
								:filmCard="true"
							/>
						</RouterLink>
					</TransitionGroup>

					<!-- Pagination Button -->
					<button
						class="movies__content-loadMore"
						:class="{ loading: store.isLoading }"
						@click="handleLoadMore"
					>
						Завантажити більше
					</button>

					<!-- Filters Search Button -->
					<button
						v-if="filter.searchBtnOpen"
						class="movies__content-loadMore fixed"
						@click="handleFilterSearch"
					>
						Шукати
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

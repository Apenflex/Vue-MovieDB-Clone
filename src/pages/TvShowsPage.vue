<script setup>
import { onBeforeMount, ref, reactive } from 'vue'

import { moviesStore } from '@/stores/moviesStore'
import { useI18n } from 'vue-i18n'
import { applyLocale } from '@/composables/useApplyLocale'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const { t, locale } = useI18n()

const currentPage = ref(1)
const filter = reactive({
	panelOpen: false,
	searchBtnOpen: false,
	sortBy: {
		label: t('pages.TvShows.Filter.options.popularity.label'),
		value: t('pages.TvShows.Filter.options.popularity.value'),
	},
})

const selectOptions = [
	{
		label: t('pages.TvShows.Filter.options.popularity.label'),
		value: t('pages.TvShows.Filter.options.popularity.value'),
	},
	{
		label: t('pages.TvShows.Filter.options.popularDesc.label'),
		value: t('pages.TvShows.Filter.options.popularDesc.value'),
	},
	{
		label: t('pages.TvShows.Filter.options.voteDesc.label'),
		value: t('pages.TvShows.Filter.options.voteDesc.value'),
	},
	{
		label: t('pages.TvShows.Filter.options.voteAsc.label'),
		value: t('pages.TvShows.Filter.options.voteAsc.value'),
	},
	{
		label: t('pages.TvShows.Filter.options.releaseDesc.label'),
		value: t('pages.TvShows.Filter.options.releaseDesc.value'),
	},
	{
		label: t('pages.TvShows.Filter.options.releaseAsc.label'),
		value: t('pages.TvShows.Filter.options.releaseAsc.value'),
	},
	{
		label: t('pages.TvShows.Filter.options.titleAsc.label'),
		value: t('pages.TvShows.Filter.options.titleAsc.value'),
	},
]

const handleFilterSearch = () => {
	store.TvShowsSortBy(filter.sortBy.value)
	filter.searchBtnOpen = false
}

const handleLoadMore = () => {
	currentPage.value++
	store.fetchTvShowsMore({ page: currentPage.value, sortBy: filter.sortBy.value, lang: locale.value })
}

onBeforeMount(() => {
	store.fetchTvShows({lang: locale.value})
})
</script>

<template>
	<main class="container">
		<section class="tvshows">
			<h1>
				{{ t('pages.TvShows.H1') }}
			</h1>
			<div class="tvshows__wrapper">
				<!-- Filters -->
				<div class="tvshows__filter">
					<div
						class="block-title"
						@click="filter.panelOpen = !filter.panelOpen"
					>
						<h2>
							{{ t('pages.TvShows.Filter.title') }}
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
						class="tvshows__filter-panel"
						:class="{ closed: !filter.panelOpen }"
					>
						<h3>
							{{ t('pages.TvShows.Filter.sortBy') }}
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
				<div class="tvshows__content">
					<TransitionGroup
						tag="div"
						name="fade"
						class="tvshows__content-items"
					>
						<RouterLink
							:to="applyLocale(`/tv/${movie.id}`)"
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
						:class="{ loading: store.isLoading }"
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

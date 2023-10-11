<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { moviesStore } from '@/stores/moviesStore'
import { applyLocale } from '@/composables/useApplyLocale'
import SearchForm from '@/components/form/SearchForm.vue'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const router = useRouter()

const searchQuery = reactive({
	query: router.currentRoute.value.query.query,
	page: Number(router.currentRoute.value.query.page),
})

const handleSearch = () => {
	// console.log('search')
	if (!searchQuery.query) return
	searchQuery.page = 1
	store.fetchSearch({
		query: searchQuery.query,
		page: searchQuery.page,
	})
	const newRoute = applyLocale('/search', { query: { query: searchQuery.query, page: searchQuery.page } })
	router.push(newRoute)
}

const handleChangePage = (options) => {
	// console.log(options)
	searchQuery.page = options.page + 1
	store.fetchSearch({
		query: searchQuery.query,
		page: searchQuery.page,
	})
	const newRoute = applyLocale('/search', { query: { query: searchQuery.query, page: searchQuery.page } })
	router.push(newRoute)
}

onMounted(() => {
	store.fetchSearch({
		query: searchQuery.query,
		page: searchQuery.page,
	})
})
</script>

<template>
	<main class="container">
		<section class="search">
			<SearchForm
				:searchQuery="searchQuery"
				@submit="handleSearch"
			/>
			<div class="search__content">
				<div class="search__content-items">
					<RouterLink
						:to="{
							name: 'media-details',
							params: { mediaType: movie.media_type, id: movie.id },
						}"
						v-for="movie in store.searchMovies.data"
						:key="movie.id"
					>
						<ItemCard
							:movie="movie"
							type="movie"
						/>
					</RouterLink>
				</div>
				<!-- Pagination -->
				<PrimePaginator
					:first="(searchQuery.page - 1) * 20"
					:rows="20"
					:totalRecords="store.searchMovies.totalResults"
					:template="{
						'370px': 'PrevPageLink CurrentPageReport NextPageLink',
						'650px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
						default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
					}"
					@page="handleChangePage"
				/>
			</div>
		</section>
	</main>
</template>

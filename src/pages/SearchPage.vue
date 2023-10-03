<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import ItemCard from '@/components/ItemCard.vue'
import { moviesStore } from '@/stores/moviesStore'

import SearchForm from '@/components/form/SearchForm.vue'

const store = moviesStore()
const router = useRouter()

const searchQuery = reactive({
	query: router.currentRoute.value.query.query,
	page: Number(router.currentRoute.value.query.page),
})
const isLoading = ref(false)

const handleSearch = () => {
	if (!searchQuery.query) return
	searchQuery.page = 1
	isLoading.value = true
	store.fetchSearch({ query: searchQuery.query, page: searchQuery.page })
	router.push({ name: 'search', query: { query: searchQuery.query, page: searchQuery.page } })
	isLoading.value = false
}

const handleChangePage = (direction) => {
	isLoading.value = true
	searchQuery.page = direction === 'next' ? searchQuery.page + 1 : searchQuery.page - 1
	store.fetchSearch({ query: searchQuery.query, page: searchQuery.page })
	router.push({ name: 'search', query: { query: searchQuery.query, page: searchQuery.page } })
	isLoading.value = false
}

onMounted(() => {
	store.fetchSearch({ query: searchQuery.query, page: searchQuery.page })
})
</script>

<template>
	<main class="container">
		<section class="search">
			<SearchForm
				:searchQuery="searchQuery"
				:isLoading="isLoading"
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
				<div class="search__content-pagination">
					<button
						@click="handleChangePage('prev')"
						:disabled="isLoading || searchQuery.page === 1"
						:class="['paginationBtn', { disabled: isLoading || searchQuery.page === 1 }]"
					>
						Prev
					</button>
					<span>{{ searchQuery.page }}</span>
					<button
						@click="handleChangePage('next')"
						:disabled="isLoading || store.searchMovies.totalPages === searchQuery.page"
						:class="[
							'paginationBtn',
							{ disabled: isLoading || store.searchMovies.totalPages === searchQuery.page },
						]"
					>
						Next
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

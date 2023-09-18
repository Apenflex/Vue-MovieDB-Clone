<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import ItemCard from '@/components/ItemCard.vue'
import { moviesStore } from '@/stores/moviesStore'

const store = moviesStore()
const router = useRouter()

const isLoading = ref(false)

const handleSearch = () => {
	if (!store.searchQuery.query) return
	isLoading.value = true
	store.fetchSearch()
	router.push({ name: 'search', query: { query: store.searchQuery.query, page: store.searchQuery.page } })
	isLoading.value = false
}

const nextPage = () => {
	if (store.hasNewMovies) {
		store.searchQuery.page = Number(router.currentRoute.value.query.page) + 1

		store.fetchSearch()
		router.push({ name: 'search', query: { query: store.searchQuery.query, page: store.searchQuery.page } })
	}
}

const prevPage = () => {
	if (store.searchQuery.page > 1) {
		store.searchQuery.page = Number(router.currentRoute.value.query.page) - 1

		store.fetchSearch()
		router.push({ name: 'search', query: { query: store.searchQuery.query, page: store.searchQuery.page } })
	}
}

onMounted(() => {
	if (router.currentRoute.value.query.query) {
		store.searchQuery.query = router.currentRoute.value.query.query
		store.searchQuery.page = router.currentRoute.value.query.page
		store.fetchSearch()
	}
})
</script>

<template>
	<main class="container">
		<section class="search">
			<!-- <h2>Популярні</h2> -->
			<form class="search-form">
				<input
					type="text"
					placeholder="Пошук фільму, серіалу, персони..."
					v-model="store.searchQuery.query"
				/>
				<button
					type="submit"
					@click.prevent="handleSearch"
					:disabled="isLoading"
				>
					Search
				</button>
			</form>
			<div class="content">
				<div class="items">
					<ItemCard
						v-for="movie in store.searchMovies"
						:key="movie.id"
						:movie="movie"
						:type="'movie'"
					/>
				</div>
				<!-- Pagination -->
				<div class="pagination">
					<button
						@click="prevPage"
						:disabled="isLoading && store.searchQuery.page === 1"
						class="page-item"
					>
						<span class="page-link">Prev</span>
					</button>
					<span>{{ store.searchQuery.page }}</span>
					<button
						@click="nextPage"
						class="page-item"
						:disabled="isLoading && !store.hasNewMovies"
					>
						<span class="page-link">Next</span>
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

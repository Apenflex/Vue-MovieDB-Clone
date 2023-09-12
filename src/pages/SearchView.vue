<script setup>
import { ref } from 'vue'

import ItemCard from '../components/ItemCard.vue'
import { moviesStore } from '@/stores/moviesStore'

const store = moviesStore()
const currentPage = ref(1)

const nextPage = () => {
  currentPage.value += 1
  store.fetchSearch({ query: store.searchQuery, page: currentPage.value })
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    store.fetchSearch({ query: store.searchQuery, page: currentPage.value })
  }
}
</script>

<template>
	<main class="container">
		<section class="search">
			<!-- <h2>Популярні</h2> -->
			<form class="search-form">
				<input
					type="text"
					placeholder="Пошук фільму, серіалу, персони..."
					v-model="searchQuery"
				/>
				<button
					type="submit"
					@click.prevent="handleSearch"
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
						:disabled="currentPage === 1"
						class="page-item"
					>
						<span class="page-link">Prev</span>
					</button>
					<span>{{ currentPage }}</span>
					<button
						@click="nextPage"
						class="page-item"
					>
						<span class="page-link">Next</span>
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

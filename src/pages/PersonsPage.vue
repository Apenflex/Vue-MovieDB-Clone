<script setup>
import { onBeforeMount, ref } from 'vue'
import { moviesStore } from '@/stores/moviesStore'

import ItemCard from '../components/ItemCard.vue'

const store = moviesStore()
const currentPage = ref(1)

const nextPage = () => {
	currentPage.value += 1
	store.fetchPersons(currentPage.value)
}

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value -= 1
		store.fetchPersons(currentPage.value)
	}
}

onBeforeMount(() => {
	store.fetchPersons(currentPage.value)
})
</script>

<template>
	<main class="container">
		<section class="persons">
			<div class="content">
				<h2>Популярні</h2>
				<div class="items">
					<ItemCard
						v-for="person in store.persons"
						:key="person.id"
						:person="person"
						:type="'person'"
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

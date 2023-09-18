<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const router = useRouter()

const isLoading = ref(false)

const nextPage = () => {
	isLoading.value = true
	if(store.personsQueryPage >= 1) {
		store.personsQueryPage = Number(router.currentRoute.value.query.page) + 1
		store.fetchPersons()
		router.push({ name: 'persons', query: { page: store.personsQueryPage } })
	}
	isLoading.value = false
}

const prevPage = () => {
	isLoading.value = true
	if(store.personsQueryPage > 1) {
		store.personsQueryPage = Number(router.currentRoute.value.query.page) - 1
		store.fetchPersons()
		router.push({ name: 'persons', query: { page: store.personsQueryPage } })
	}
	isLoading.value = false
}

onMounted(() => {
	// console.log(router.currentRoute.value.query.page)
	if(router.currentRoute.value.query.page) {
		store.personsQueryPage = router.currentRoute.value.query.page
		store.fetchPersons()
	}
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
						:disabled="isLoading && router.currentRoute.value.query.page <= 1"
						:class="['page-item', { disabled: router.currentRoute.value.query.page <= 1 }]"
					>
						<span class="page-link">Prev</span>
					</button>
					<span>{{ store.personsQueryPage }}</span>
					<button
						@click="nextPage"
						:disabled="isLoading && !store.hasNewPersons"
						:class="['page-item', { disabled: !store.hasNewPersons }]"
					>
						<span class="page-link">Next</span>
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

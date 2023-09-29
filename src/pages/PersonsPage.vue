<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const router = useRouter()

const currentPage = ref(Number(router.currentRoute.value.query.page))
const isLoading = ref(false)

const handleChangePage = (direction) => {
	isLoading.value = true
	currentPage.value = direction === 'next' ? currentPage.value + 1 : currentPage.value - 1
	store.fetchPersons(currentPage.value)
	router.push({ name: 'persons', query: { page: currentPage.value } })
	isLoading.value = false
}

onMounted(() => {
	store.fetchPersons(currentPage.value)
})
</script>

<template>
	<main class="container">
		<section class="persons-section">
			<div class="content">
				<h2>Популярні</h2>
				<div class="items">
					<RouterLink
						v-for="person in store.getPersons"
						:key="person.name"
						:to="{
							name: 'person-details',
							params: {
								alias: `${person.id}-${person.name.split(' ').join('-').toLowerCase()}`,
							},
						}"
					>
						<ItemCard
							:person="person"
							:personCard="true"
						/>
					</RouterLink>
				</div>
				<!-- Pagination -->
				<div class="pagination">
					<button
						@click="handleChangePage('prev')"
						:disabled="isLoading || currentPage.valueOf() === 1"
						:class="{ disabled: currentPage === 1 || isLoading }"
					>
						Prev
					</button>
					<span>{{ currentPage }}</span>
					<button
						@click="handleChangePage('next')"
						:disabled="isLoading || store.persons.totalPages === currentPage.valueOf()"
						:class="{ disabled: isLoading || store.persons.totalPages === currentPage.valueOf() }"
					>
						Next
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

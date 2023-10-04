<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { moviesStore } from '@/stores/moviesStore'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const router = useRouter()

const currentPage = ref(Number(router.currentRoute.value.query.page))

const handleChangePage = (options) => {
	// console.log(options)
	currentPage.value = options.page + 1
	store.fetchPersons(currentPage.value)
	router.push({
		name: 'persons',
		query: { page: currentPage.value },
	})
}

onMounted(() => {
	store.fetchPersons(currentPage.value)
})
</script>

<template>
	<main class="container">
		<section class="persons">
			<div class="persons__content">
				<h1>Популярні</h1>
				<div class="persons__items">
					<RouterLink
						v-for="person in store.getPersons"
						:key="person.name"
						:to="{
							name: 'person-details',
							params: { alias: `${person.id}-${person.name.split(' ').join('-').toLowerCase()}` },
						}"
					>
						<ItemCard
							:person="person"
							:personCard="true"
						/>
					</RouterLink>
				</div>
				<!-- Pagination -->
				<!-- <div class="pagination">
					<button
						@click="handleChangePage('prev')"
						:disabled="isLoading || currentPage.valueOf() === 1"
						:class="['paginationBtn',{ disabled: currentPage === 1 || isLoading }]"
					>
						Prev
					</button>
					<span>{{ currentPage }}</span>
					<button
						@click="handleChangePage('next')"
						:disabled="isLoading || store.persons.totalPages === currentPage.valueOf()"
						:class="['paginationBtn',{ disabled: isLoading || store.persons.totalPages === currentPage.valueOf() }]"
					>
						Next
					</button>
				</div> -->
				<div class="persons__pagination">
					<PrimePaginator
						:first="(currentPage - 1) * 20"
						:rows="20"
						:totalRecords="store.persons.totalResults"
						:template="{
							'370px': 'PrevPageLink CurrentPageReport NextPageLink',
							'650px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
							default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
						}"
						@page="handleChangePage"
					/>
				</div>
			</div>
		</section>
	</main>
</template>

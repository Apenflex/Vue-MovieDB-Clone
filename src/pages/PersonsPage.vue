<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { moviesStore } from '@/stores/moviesStore'
import { useI18n } from 'vue-i18n'
import { applyLocale } from '@/composables/useApplyLocale'
import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()
const router = useRouter()
const { t, locale } = useI18n()

const currentPage = ref(Number(router.currentRoute.value.query.page))

const handleChangePage = async (options) => {
	// console.log(options)
	currentPage.value = options.page + 1
	await store.fetchPersons({ page: currentPage.value, lang: locale.value })
	const newRoute = applyLocale('/persons', { query: { page: currentPage.value } })
	router.push(newRoute)
}

onMounted(() => {
	store.fetchPersons({ page: currentPage.value, lang: locale.value })
})
</script>

<template>
	<main class="container">
		<section class="persons">
			<div class="persons__content">
				<h1>
					{{ t('pages.Persons.H1') }}
				</h1>
				<div class="persons__items">
					<RouterLink
						v-for="person in store.getPersons"
						:key="person.name"
						:to="applyLocale(`/persons/${person.id}-${person.name.split(' ').join('-').toLowerCase()}`)"
					>
						<ItemCard
							:person="person"
							:personCard="true"
						/>
					</RouterLink>
				</div>
				<!-- Pagination -->
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

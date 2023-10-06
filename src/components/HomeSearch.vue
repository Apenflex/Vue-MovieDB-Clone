<script setup>
import { onBeforeMount, reactive, computed } from 'vue'
import { moviesStore } from '@/stores/moviesStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import SearchForm from '@/components/form/SearchForm.vue'

const store = moviesStore()
const router = useRouter()
const { t } = useI18n()

const searchQuery = reactive({ query: '', page: 1 })

const backgroundImage = computed(() => {
	return {
		backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.8) 100%), url(${store.randomPosterURL})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	}
})

const handleSearch = () => {
	console.log('search')
	if (!searchQuery.query) return
	store.isLoading = true
	router.push({
		name: 'search',
		query: { query: searchQuery.query, page: searchQuery.page },
	})
	searchQuery.query = ''
	store.isLoading = false
}

onBeforeMount(() => {
	store.getRandomPoster()
})
</script>

<template>
	<div class="container">
		<section
			class="searchblock"
			:style="backgroundImage"
		>
			<div class="searchblock__wrapper">
				<div class="searchblock__title">
					<h1>
						{{ t('components.HomeSearch.h1') }}
					</h1>
					<h2>
						{{ t('components.HomeSearch.h2') }}
					</h2>
				</div>
				<SearchForm
					:searchQuery="searchQuery"
					@submit="handleSearch"
				/>
			</div>
		</section>
	</div>
</template>

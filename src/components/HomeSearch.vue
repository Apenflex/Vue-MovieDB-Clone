<script setup>
import { onBeforeMount, reactive, ref, computed } from 'vue'
import { moviesStore } from '@/stores/moviesStore'
import { useRouter } from 'vue-router'

import SearchForm from '@/components/form/SearchForm.vue'

const store = moviesStore()
const router = useRouter()

const searchQuery = reactive({ query: '', page: 1 })
const isLoading = ref(false)

const backgroundImage = computed(() => {
	return {
		backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.8) 100%), url(${store.randomPosterURL})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	}
})

const handleSearch = () => {
	if (!searchQuery.query) return
	isLoading.value = true
	router.push({ name: 'search', query: { query: searchQuery.query, page: searchQuery.page } })
	searchQuery.query = ''
	isLoading.value = false
}

onBeforeMount(() => {
	store.getRandomPoster()
})
</script>

<template>
	<div class="container">
		<section
			class="home-search"
			:style="backgroundImage"
		>
			<div class="wrapper">
				<div class="title">
					<h1>Ласкаво просимо.</h1>
					<h2>Мільйони фільмів, серіалів і персон. Досліджуйте зараз.</h2>
				</div>
				<SearchForm
					:searchQuery="searchQuery"
					:isLoading="isLoading"
					@submit="handleSearch"
				/>
			</div>
		</section>
	</div>
</template>

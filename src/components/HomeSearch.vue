<script setup>
import { onBeforeMount, ref } from 'vue'
import { moviesStore } from '@/stores/moviesStore'
import { useRouter } from 'vue-router'

const store = moviesStore()
const router = useRouter()

const isLoading = ref(false)

const handleSearch = () => {
	if (!store.searchQuery.query) return
	isLoading.value = true
	store.fetchSearch()
	router.push({ name: 'search', query: { query: store.searchQuery.query, page: store.searchQuery.page} })
	isLoading.value = false
}

onBeforeMount(() => {
	store.getRandomPoster()
})
</script>

<template>
	<section
		class="home-search container"
		:style="{
			backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.8) 100%), url(${store.randomPosterURL})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}"
	>
		<div class="wrapper">
			<div class="title">
				<h1>Ласкаво просимо.</h1>
				<h2>Мільйони фільмів, серіалів і персон. Досліджуйте зараз.</h2>
			</div>
			<form class="form">
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
		</div>
	</section>
</template>

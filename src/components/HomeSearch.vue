<script setup>
import { onBeforeMount, ref } from 'vue'
import { moviesStore } from '@/stores/moviesStore'
import { useRouter } from 'vue-router'

const store = moviesStore()
const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
	if (!searchQuery.value) return
	store.fetchSearch({ query: searchQuery.value, page: 1 })
	router.push({ name: 'search', query: { query: searchQuery.value } })
}

onBeforeMount(() => {
	store.getRandomPoster()
})
</script>

<template>
	<section
		class="home-search"
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
			<form class="home-search-form">
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
		</div>
	</section>
</template>

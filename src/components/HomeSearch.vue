<script setup>
import { onBeforeMount } from 'vue'
import { moviesStore } from '@/stores/moviesStore'

const store = moviesStore()

onBeforeMount(() => {
  store.getRandomPoster()
})

</script>

<template>
	<section
		class="search"
		:style="{
			backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.8) 100%), url(${store.randomPosterURL})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}"
	>
		<div class="search-wrapper">
			<div class="search-title">
				<h1>Ласкаво просимо.</h1>
				<h2>Мільйони фільмів, серіалів і персон. Досліджуйте зараз.</h2>
			</div>
			<form class="search-form">
				<input
					type="text"
					placeholder="Пошук фільму, серіалу, персони..."
				/>
				<button>Search</button>
			</form>
		</div>
	</section>
</template>

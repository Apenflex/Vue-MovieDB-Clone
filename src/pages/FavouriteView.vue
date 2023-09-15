<script setup>
import { onBeforeMount } from 'vue'

import { moviesStore } from '@/stores/moviesStore'

import ItemCard from '@/components/ItemCard.vue'

const store = moviesStore()

onBeforeMount(() => {
	const storedFavouriteMovies = localStorage.getItem('favouriteMovies')

	if (storedFavouriteMovies) {
		store.favouriteMovies = JSON.parse(storedFavouriteMovies)
	}
})
</script>

<template>
	<main class="container">
		<section class="favourite">
			<div class="content">
				<h2>Улюбленні</h2>
				<!-- <div class="items">
					<RouterLink
						:to="{ name: 'item-details', params: { mediaType: movie.media_type || movie, id: movie.id } }"
						v-for="movie in store.favouriteMovies"
						:key="movie.id"
					>
						<ItemCard
							:movie="movie"
							:type="'movie'"
							:favourite="true"
						/>
					</RouterLink>
				</div> -->
				<div class="items">
					<ItemCard
						v-for="movie in store.favouriteMovies"
						:key="movie.id"
						:movie="movie"
						:type="'movie'"
						:favourite="true"
					/>
				</div>
			</div>
		</section>
	</main>
</template>

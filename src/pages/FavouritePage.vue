<script setup>
import { onBeforeMount } from 'vue'

import { useFavouritesStore } from '@/stores/moviesStore'

import ItemCard from '@/components/ItemCard.vue'

const store = useFavouritesStore()

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
				<TransitionGroup
					tag="div"
					name="fade"
					class="items"
				>
					<RouterLink
						:to="{ name: 'item-details', params: { mediaType: movie.media_type || movie, id: movie.id } }"
						v-for="movie in store.favouriteMovies"
						:key="movie.id"
					>
						<ItemCard
							:movie="movie"
							type="movie"
							:favouriteCard="true"
						/>
					</RouterLink>
				</TransitionGroup>
			</div>
		</section>
	</main>
</template>

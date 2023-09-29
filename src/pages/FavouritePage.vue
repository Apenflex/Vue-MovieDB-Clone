<script setup>
import { useFavouritesStore } from '@/stores/moviesStore'

import ItemCard from '@/components/ItemCard.vue'

const store = useFavouritesStore()
</script>

<template>
	<main class="container">
		<section class="favourite">
			<div class="content">
				<h2>Улюбленні</h2>
				<div
					v-if="!store.favouriteMovies.length"
					class="nodata"
				>
					Ще не має улюблених....
				</div>
				<TransitionGroup
					tag="div"
					name="fade"
					class="items"
				>
					<RouterLink
						v-for="movie in store.favouriteMovies"
						:key="movie.id"
						:to="{
							name: 'media-details',
							params: {
								mediaType: movie.media_type,
								id: movie.id,
							},
						}"
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

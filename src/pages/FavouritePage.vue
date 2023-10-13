<script setup>
import { computed } from 'vue'

import { useFavouritesStore } from '@/stores/useFavouritesStore'
import { useI18n } from 'vue-i18n'
import { applyLocale } from '@/composables/useApplyLocale'
import ItemCard from '@/components/ItemCard.vue'

const store = useFavouritesStore()
const { t } = useI18n()
const emptyFavourites = computed(() => !store.favouriteMovies.length)
</script>

<template>
	<main class="container">
		<section class="favourite">
			<div class="favourite__content">
				<h2>{{ t('pages.Favourite.H1') }}</h2>
				<div
					v-if="emptyFavourites"
					class="favourite__content-empty"
				>
					{{ t('pages.Favourite.noFavourites') }}
				</div>
				<TransitionGroup
					tag="div"
					name="fade"
					class="favourite__items"
				>
					<RouterLink
						v-for="movie in store.favouriteMovies"
						:key="movie.id"
						:to="applyLocale(`/${movie.media_type}/${movie.id}`)"
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

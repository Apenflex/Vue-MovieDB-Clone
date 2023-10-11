<script setup>
import { applyLocale } from '@/composables/useApplyLocale'

const props = defineProps({
	getPersonData: {
		type: Array,
		default: () => [],
	},
	title: {
		type: String,
		default: '',
	},
})

const getYear = (dateString) => {
	if (!dateString) return '...'

	const year = dateString.slice(0, 4)
	return year
}
</script>

<template>
	<div v-if="props.getPersonData.length !== 0">
		<h3>
			{{ title }}
		</h3>
		<div class="list">
			<div
				v-for="movie in props.getPersonData"
				:key="movie.credit_id"
			>
				<span class="year">
					{{ getYear(movie.release_date || movie.first_air_date) }}
				</span>
				<span class="separator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
					>
						<path
							d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
						/>
					</svg>
				</span>
				<div>
					<RouterLink :to="applyLocale(`/${movie.episode_count ? 'tv' : 'movie'}/${movie.id}`)">
						{{ movie.original_title || movie.original_name }}
					</RouterLink>
					<span> ... {{ movie.job || movie.character }} </span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { moviesStore } from '@/stores/moviesStore'

const props = defineProps({
	searchQuery: {
		query: String,
		page: Number,
	},
})
defineEmits(['submit'])

const store = moviesStore()

const searchQuery = ref(props.searchQuery)
const isSmallScreen = ref(false)

const findScreenWidth = () => {
	isSmallScreen.value = window.innerWidth <= 490
}

onMounted(() => {
	findScreenWidth()
	window.addEventListener('resize', findScreenWidth)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', findScreenWidth)
})
</script>

<template>
	<form
		class="search__form"
		@submit.prevent="$emit('submit')"
	>
		<input
			v-model="searchQuery.query"
			type="text"
			:placeholder="isSmallScreen ? 'Пошук...' : 'Пошук фільму, серіалу, персони...'"
		/>
		<button
			:disabled="store.isLoading || !searchQuery.query"
			class="searchBtn"
		>
			Search
		</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	searchQuery: {
		type: String,
		default: '',
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
})

defineEmits(['submit'])

const searchQuery = ref(props.searchQuery)
</script>

<template>
	<form
		class="search__form"
		@submit.prevent="$emit('submit')"
	>
		<input
			type="text"
			placeholder="Пошук фільму, серіалу, персони..."
			v-model="searchQuery.query"
		/>
		<button
			:disabled="isLoading"
			class="searchBtn"
		>
			Search
		</button>
	</form>
</template>

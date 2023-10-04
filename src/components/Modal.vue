<script setup>
const props = defineProps({
	movie: {
		title: {
			type: String,
			default: '',
		},
		path: {
			type: String,
			default: '',
		},
	},
	isOpen: {
		type: Boolean,
		default: false,
	},
})

defineEmits(['toggle-modal'])
</script>

<template>
	<div class="modal-overlay">
		<div class="modal">
			<div class="modal__header">
				<h3>{{ movie.title }}</h3>
				<button
					class="modal-close"
					@click="$emit('toggle-modal')"
				>
					X
				</button>
			</div>
			<div class="modal__content">
				<iframe
					width="100%"
					height="100%"
					:src="`https://www.youtube.com/embed/${movie.path}`"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>
</template>

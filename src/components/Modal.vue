<script setup>
const props = defineProps({
  movie: Object,
  isOpen: Boolean,
})
defineEmits(['toggle-modal'])
</script>

<template>
	<div class="modal-overlay">
		<div class="modal">
			<div class="modal-header">
				<h3>{{ movie.title  }} </h3>
				<button
					class="modal-close"
					@click="$emit('toggle-modal')"
				>
					X
				</button>
			</div>
			<div class="modal-content">
        <iframe
          width="100%"
          height="100%"
          :src="`https://www.youtube.com/embed/${movie.url}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
			</div>
		</div>
	</div>
</template>

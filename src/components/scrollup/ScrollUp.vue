<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showButton = ref(false)

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

const handleScroll = () => {
	if (window.pageYOffset > 600) {
		showButton.value = true
	} else {
		showButton.value = false
	}
}

onMounted(() => {
	window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
	<!-- v-if="showButton" -->
	<button
		@click="scrollToTop"
		:class="['scroll-up-btn', { hide: !showButton }]"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="1em"
			viewBox="0 0 320 512"
			fill="#fff"
		>
			<path
				d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
			/>
		</svg>
	</button>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import IconHeart from '@/components/IconHeart.vue'

const router = useRouter()
const isMenuOpen = ref(false)
console.log(router.currentRoute.value.name)

const toggleMenu = () => {
	if (isMenuOpen.value) isMenuOpen.value = false
}
watch(isMenuOpen, (newValue) => {
	newValue ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '')
})
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="wrapper">
				<div
					:class="['logo', { logo__mobile: isMenuOpen }]"
					@click="isMenuOpen ? (isMenuOpen = false) : null"
				>
					<RouterLink to="/">
						<img
							src="/public/images/movie_logo.svg"
							alt="logo"
						/>
					</RouterLink>
				</div>

				<!-- Desktop Menu -->
				<nav :class="{ 'menu-active': isMenuOpen }">
					<RouterLink
						:to="{ name: 'favourite', path: '/favourite' }"
						@click="toggleMenu"
					>
						<IconHeart />
					</RouterLink>
					<RouterLink
						:to="{ name: 'movies', path: '/movies' }"
						@click="toggleMenu"
						:class="{ active: router.currentRoute.value.name === 'movies' }"
					>
						Movies
					</RouterLink>
					<RouterLink
						:to="{ name: 'tv-shows', path: '/tv-shows' }"
						@click="toggleMenu"
						:class="{ active: router.currentRoute.value.name === 'tv-shows' }"
					>
						TV Shows
					</RouterLink>
					<RouterLink
						:to="{ name: 'persons' , query: { page: 1 }}"
						@click="toggleMenu"
						:class="{ active: router.currentRoute.value.name === 'persons' }"
					>
						Persons
					</RouterLink>
				</nav>

				<!-- Mobile Menu -->
				<div
					:class="['hamburger hamburger--spring', { 'is-active': isMenuOpen }]"
					@click="isMenuOpen = !isMenuOpen"
				>
					<div class="hamburger-box">
						<div class="hamburger-inner"></div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

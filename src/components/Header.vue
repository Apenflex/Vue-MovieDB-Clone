<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import IconHeart from '@/components/IconHeart.vue'

const links = [
	{ name: 'Movies', path: '/movies' },
	{ name: 'TV Shows', path: '/tv-shows' },
	{ name: 'Persons', path: '/persons' },
]

const isMenuOpen = ref(false)

const toggleMenu = () => {
	if (isMenuOpen.value) isMenuOpen.value = false
}
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
						to="/favourite"
						@click="toggleMenu"
					>
						<IconHeart />
					</RouterLink>
					<RouterLink
						v-for="link in links"
						:key="link.name"
						:to="link.path + (link.path === '/persons' ? '?page=' + 1 : '')"
						@click="toggleMenu"
					>
						{{ link.name }}
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

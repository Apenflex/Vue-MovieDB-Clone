<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import IconHeart from '@/components/IconHeart.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="wrapper">
				<div
					:class="['logo', { 'logo__mobile': isMenuOpen }]"
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
				<div :class="['links', { 'menu-active': isMenuOpen }]">
					<RouterLink
						to="/favourite"
						@click="toggleMenu"
					>
						<IconHeart />
					</RouterLink>
					<RouterLink
						to="/movies"
						@click="toggleMenu"
						>Movies</RouterLink
					>
					<RouterLink
						to="/tv-shows"
						@click="toggleMenu"
						>TV Shows</RouterLink
					>
					<RouterLink
						to="/persons"
						@click="toggleMenu"
						>Persons</RouterLink
					>
				</div>

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

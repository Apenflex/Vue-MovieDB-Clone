<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import IconHeart from '@/components/IconHeart.vue'

const isMenuOpen = ref(false)
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="header-wrapper">
				<div
					:class="['header-logo', { 'header-logo__mobile': isMenuOpen }]"
					@click="isMenuOpen ? (isMenuOpen = false) : null"
				>
					<RouterLink to="/">
						<img
							src="../assets/images/movie_logo.svg"
							alt="logo"
							class="header-logo__img"
						/>
					</RouterLink>
				</div>

				<!-- Desktop Menu -->
				<div :class="['header-nav', { 'menu-active': isMenuOpen }]">
					<RouterLink
						to="/favourite"
						@click="isMenuOpen = !isMenuOpen"
					>
						<IconHeart />
					</RouterLink>
					<RouterLink
						to="/movies"
						@click="isMenuOpen = !isMenuOpen"
						>Movies</RouterLink
					>
					<RouterLink
						to="/tv-shows"
						@click="isMenuOpen = !isMenuOpen"
						>TV Shows</RouterLink
					>
					<RouterLink
						to="/persons"
						@click="isMenuOpen = !isMenuOpen"
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

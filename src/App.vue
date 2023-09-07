<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconHeart from './components/IconHeart.vue'
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="header-wrapper">
				<div class="header-logo">
					<RouterLink to="/">
						<img
							src="./assets/movie_logo.svg"
							alt="logo"
							class="header-logo__img"
						/>
					</RouterLink>
				</div>
				<div class="header-nav">
					<RouterLink to="/favourite">
						<IconHeart />
					</RouterLink>
					<RouterLink to="/movies">Movies</RouterLink>
					<RouterLink to="/tv-shows">TV Shows</RouterLink>
					<RouterLink to="/persons">Persons</RouterLink>
				</div>
			</div>
		</div>
	</header>

	<RouterView />
</template>

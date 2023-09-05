<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<header>
		<div>
			<h3>hi</h3>
			<nav>
				<RouterLink to="/">Home</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>

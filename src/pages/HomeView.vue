<script setup>
import HomeSearch from '../components/HomeSearch.vue'
import HomeTrends from '../components/HomeTrends.vue';
import HomePopular from '../components/HomePopular.vue';
import HomeTrailers from '../components/HomeTrailers.vue';
</script>

<template>
	<main class="container">
		<HomeSearch />
    <HomeTrends />
		<HomeTrailers />
		<HomePopular />
	</main>
</template>

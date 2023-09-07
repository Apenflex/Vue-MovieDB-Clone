<script setup></script>

<template>
	<div class="trend-slide">
		<img
			:src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
			alt="slide"
		/>
		<div class="trend-names-block">
			<span>{{ movie.original_title || movie.original_name }}</span>
			<span>{{ formatDate(movie.release_date || movie.first_air_date) }}</span>
		</div>
	</div>
</template>

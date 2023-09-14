<script setup>
import { onBeforeMount } from 'vue'
import { moviesStore } from '@/stores/moviesStore'
import { useRouter } from 'vue-router'

const store = moviesStore()
const router = useRouter()

const id = router.currentRoute.value.params.id
const mediaType = router.currentRoute.value.params.mediaType

const calcVoteColor = (vote) => {
	switch (true) {
		case vote >= 70:
			return { border: '5px solid green' }
		case vote >= 50:
			return { border: '5px solid orange' }
		case vote >= 0:
			return { border: '5px solid red' }
		default:
			return { color: '#fff' }
	}
}

onBeforeMount(() => {
	store.fetchMediaDetails({ mediaType, id })
})
</script>

<template>
	<section
		class="details"
		:style="{
			backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 40%), url(https://image.tmdb.org/t/p/original/${store.mediaDetails.poster_path})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}"
	>
		<div class="wrapper">
			<div class="image">
				<img
					:src="`https://image.tmdb.org/t/p/original/${store.mediaDetails.poster_path}`"
					alt=" 
				{{ store.mediaDetails.title }}
				"
				/>
			</div>
			<div class="content">
				<div class="head">
					<div class="block">
						<h2>{{ store.mediaDetails.title }}</h2>
						<span> ({{ store.mediaDetails.release_date.split('-')[0] }}) </span>
					</div>
					<div class="facts">
						<span class="release">
							{{ store.mediaDetails.release_date.split('-').reverse().join('-') }}
						</span>
						<span class="genres">
							{{ store.mediaDetails.genres.map((genre) => genre.name).join(', ') }}
						</span>
						<span class="runtime">
							{{ Math.floor(store.mediaDetails.runtime / 60) }}h {{ store.mediaDetails.runtime % 60 }}m
						</span>
					</div>
				</div>
				<ul class="actions">
					<li class="rating">
						<div
							class="icon"
							:style="calcVoteColor((store.mediaDetails.vote_average * 10).toFixed())"
						>
							<span class="icon-count"> {{ (store.mediaDetails.vote_average * 10).toFixed() }}</span>
							<span class="icon-percentage"> % </span>
						</div>
						<div class="title">Оцінка користувачів</div>
					</li>
					<li class="tooltip"></li>
					<li class="tooltip"></li>
					<li class="tooltip"></li>
					<li class="tooltip"></li>
					<li class="play">
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="15px"
								viewBox="0 0 384 512"
							>
								<path
									d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
									fill="#ffffff"
								/>
							</svg>
						</span>
						відтворити тизер
					</li>
				</ul>
				<div class="info"></div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Mousewheel, FreeMode } from 'swiper/modules'

import { moviesStore } from '@/stores/moviesStore'
import PersonMovieTable from '@/components/PersonMovieTable.vue'

const store = moviesStore()
const router = useRouter()

const personId = ref(null)
const showMoreBio = ref(false)
// const isLoaded = ref(true)

const personBiography = computed(() => {
	const biography = store.getPerson.bio.biography
	return showMoreBio.value ? biography : biography.slice(0, 1200) + '...'
})

onBeforeMount(() => {
	personId.value = Number(
		router.currentRoute.value.params.alias.slice(0, router.currentRoute.value.params.alias.indexOf('-'))
	)
})

onMounted(() => {
	store.fetchPerson(personId.value)
})
</script>

<template>
	<section class="personbio container">
		<div class="wrapper">
			<!-- Bio -->
			<div class="bio">
				<div class="block">
					<div
						class="image"
						>
						<!-- :class="{ loaded: isLoaded }" -->
						<img
							:src="`https://image.tmdb.org/t/p/w500${store.getPerson.bio.profile_path}`"
							:alt="store.getPerson.bio.name"
						/>
					</div>
					<div class="desc">desc</div>
				</div>
			</div>

			<!-- Content -->
			<div class="content">
				<h2 class="title">{{ store.getPerson.bio.name }}</h2>
				<div class="biography">
					<h3>Біографія</h3>
					<p
						v-if="store.getPerson.bio.biography"
						class="bio-text"
						:class="{ expanded: showMoreBio }"
					>
						{{ personBiography }}
						<button @click="showMoreBio = !showMoreBio">
							{{ showMoreBio ? 'Згорнути' : 'Читати більше >' }}
						</button>
					</p>
					<p v-else>Відсутня біографія для {{ store.getPerson.bio.name }}. <br /></p>
				</div>

				<!-- Slider -->
				<div class="known_for">
					<h3>Відомий (-а) за</h3>
					<div>Slider</div>
				</div>

				<!-- Film Table -->
				<div class="credits_list">
					<PersonMovieTable
						:getPersonData="store.getPersonDirector"
						title="Режисура"
					/>
					<PersonMovieTable
						:getPersonData="store.getPersonCast"
						title="Акторська гра"
					/>
					<PersonMovieTable
						:getPersonData="store.getPersonCamera"
						title="Операторська робота"
					/>
					<PersonMovieTable
						:getPersonData="store.getPersonCrew"
						title="Команда"
					/>
					<PersonMovieTable
						:getPersonData="store.getPersonEditing"
						title="Сценарій"
					/>
					<PersonMovieTable
						:getPersonData="store.getPersonProducer"
						title="Виробництво"
					/>
					<PersonMovieTable
						:getPersonData="store.getPersonWriter"
						title="Монтаж"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

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

const personPoster = computed(() => {
	return `https://image.tmdb.org/t/p/w500/${store.getPerson.bio.profile_path}`
})

const personWorks = computed(() => {
	return store.getPersonCast.length
})

const personGender = computed(() => {
	return store.getPerson.bio.gender === 1 ? 'Жіноча' : 'Чоловіча'
})

const personBirthday = computed(() => {
	return store.getPerson.bio.birthday ? store.getPerson.bio.birthday : 'Відсутній'
})

const personFullYears = computed(() => {
	return store.getPerson.bio.birthday
		? `(${new Date().getFullYear() - new Date(store.getPerson.bio.birthday).getFullYear()})`
		: ''
})

const personBirthPlace = computed(() => {
	return store.getPerson.bio.place_of_birth ? store.getPerson.bio.place_of_birth : 'Відсутнє'
})

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
					<div class="image">
						<img
							:src="personPoster"
							:alt="store.getPerson.bio.name"
						/>
					</div>
					<!-- Mobile Tiile -->
					<h2 class="title">{{ store.getPerson.bio.name }}</h2>
					<div class="desc">
						<div class="social-icons">
							<a
								v-if="store.getPerson.externalIds.facebook_id"
								:href="`https://www.facebook.com/${store.getPerson.externalIds.facebook_id}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="1em"
									viewBox="0 0 512 512"
								>
									<path
										d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
									/>
								</svg>
							</a>
							<a
								v-if="store.getPerson.externalIds.instagram_id"
								:href="`https://www.instagram.com/${store.getPerson.externalIds.instagram_id}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="1em"
									viewBox="0 0 448 512"
								>
									<path
										d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
									/>
								</svg>
							</a>
							<a
								v-if="store.getPerson.externalIds.twitter_id"
								:href="`https://twitter.com/${store.getPerson.externalIds.twitter_id}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="1em"
									viewBox="0 0 512 512"
								>
									<path
										d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
									/>
								</svg>
							</a>
						</div>
						<h3>Особиста інформація</h3>
						<div class="info">
							<div class="head">
								Відомий (-а) за
								<span>{{ store.getPerson.bio.known_for_department }}</span>
							</div>
							<div class="head">
								Кількість робіт
								<span> {{ personWorks }} </span>
							</div>
							<div class="head">
								Стать
								<span>{{ personGender }}</span>
							</div>
							<div class="head">
								День народження
								<span>
									{{ personBirthday }}
									{{ personFullYears }}
								</span>
							</div>
							<div class="head">
								Місце народження
								<span>
									{{ personBirthPlace }}
								</span>
							</div>
							<div class="head know_how">
								Також відомий (-а) як
								<span
									v-for="item in store.getPerson.bio.also_known_as"
									:key="item"
								>
									{{ item }}
								</span>
							</div>
						</div>
					</div>
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

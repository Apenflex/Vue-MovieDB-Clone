<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import IconHeart from '@/components/icons/IconHeart.vue'

const router = useRouter()

const isMenuOpen = ref(false)
const header = ref()
const { y } = useWindowScroll(header)

const { t, locale } = useI18n()
const locales = ref([
	{
		label: t('components.HeaderBlock.english'),
		value: t('components.HeaderBlock.eng'),
	},
	{
		label: t('components.HeaderBlock.ukrainian'),
		value: t('components.HeaderBlock.ukr'),
	},
])
const currentLocale = ref(locales.value.find((el) => el.value === locale.value))

const changeLocale = (newLocale) => {
	console.log('changeLocale')
	console.log(newLocale.value)
	locale.value = newLocale.value
}

const toggleMenu = () => {
	if (isMenuOpen.value) isMenuOpen.value = false
}

watch(y, (newValue, oldValue) => {
	if (newValue > 60 && newValue > oldValue) {
		header.value.classList.remove('header--show')
	} else {
		header.value.classList.add('header--show')
	}
})

watch(isMenuOpen, (newValue) => {
	newValue ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '')
})

onMounted(() => {
	console.log(locale)
})
</script>

<template>
	<header
		ref="header"
		class="header header--show"
	>
		<div class="container">
			<div class="header__wrapper">
				<div
					:class="['header__logo', { 'header__logo--mobile': isMenuOpen }]"
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
				<nav :class="['header__nav', { 'menu-active': isMenuOpen }]">
					<VueMultiselect
						v-model="currentLocale"
						:options="locales"
						:searchable="false"
						hide-selected
						openDirection="bottom"
						label="label"
						track-by="value"
						selectLabel=""
						@select="changeLocale"
					/>
					<RouterLink
						:to="{ name: 'favourite', path: '/favourite' }"
						@click="toggleMenu"
						class="header__nav-item"
					>
						<IconHeart />
					</RouterLink>
					<RouterLink
						:to="{ name: 'movies', path: '/movies' }"
						@click="toggleMenu"
						:class="['header__nav-item', { active: router.currentRoute.value.name === 'movies' }]"
					>
						<!-- Movies -->
						{{ t('components.HeaderBlock.movies') }}
					</RouterLink>
					<RouterLink
						:to="{ name: 'tv-shows', path: '/tv-shows' }"
						@click="toggleMenu"
						:class="['header__nav-item', { active: router.currentRoute.value.name === 'tv-shows' }]"
					>
						{{ t('components.HeaderBlock.tvshows') }}
					</RouterLink>
					<RouterLink
						:to="{ name: 'persons', query: { page: 1 } }"
						@click="toggleMenu"
						:class="['header__nav-item', { active: router.currentRoute.value.name === 'persons' }]"
					>
						{{ t('components.HeaderBlock.persons') }}
					</RouterLink>
				</nav>

				<!-- Mobile Menu -->
				<VueMultiselect
					v-model="currentLocale"
					:options="locales"
					:searchable="false"
					hide-selected
					openDirection="bottom"
					label="label"
					track-by="value"
					selectLabel=""
					@select="changeLocale"
					class="mobile"
				/>
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

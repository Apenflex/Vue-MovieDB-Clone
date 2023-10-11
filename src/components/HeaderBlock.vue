<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { applyLocale } from '@/composables/useApplyLocale'
import IconHeart from '@/components/icons/IconHeart.vue'

const router = useRouter()
const { t, locale, fallbackLocale } = useI18n()

const isMenuOpen = ref(false)
const header = ref()
const { y } = useWindowScroll(header)
const currentLocale = ref({})

const locales = [
	{
		label: t('translation.ukrainian.label'),
		value: t('translation.ukrainian.value'),
	},
	{
		label: t('translation.english.label'),
		value: t('translation.english.value'),
	},
]

// const calcLocaleUrl = (newLocale) => {
// 	const defaultLocale = fallbackLocale.value
// 	let currentPath = router.currentRoute.value.fullPath
// 	if (currentPath === '/') {
// 		currentPath = ''
// 	}

// 	if (newLocale !== undefined) {
// 		const currentPathWithoutLocale =
// 			locale.value !== defaultLocale ? currentPath.replace(`/${locale.value}`, '') : currentPath

// 		let newPath =
// 			newLocale !== defaultLocale ? `/${newLocale}${currentPathWithoutLocale}` : currentPathWithoutLocale

// 		if (newPath === '') {
// 			newPath = '/'
// 		}

// 		return newPath
// 	}
// }

const changeLocale = async (newLocale) => {
	const defaultLocale = fallbackLocale.value

	let currentPath = router.currentRoute.value.fullPath
	if (currentPath === '/') {
		currentPath = ''
	}

	const currentPathWithoutLocale =
		locale.value !== defaultLocale ? currentPath.replace(`/${locale.value}`, '') : currentPath

	let newPath =
		newLocale.value !== defaultLocale ? `/${newLocale.value}${currentPathWithoutLocale}` : currentPathWithoutLocale
	if (newPath === '') {
		newPath = '/'
	}

	await router.push(newPath)

	location.reload()
}

const toggleMenu = () => {
	if (isMenuOpen.value) isMenuOpen.value = false
}

const activeLink = (link) => {
	switch (link) {
		case 'movies':
			return {
				active: router.currentRoute.value.name === 'movies' || router.currentRoute.value.name === 'movies-en',
			}
		case 'tv':
			return {
				active: router.currentRoute.value.name === 'tv' || router.currentRoute.value.name === 'tv-en',
			}
		case 'persons':
			return {
				active: router.currentRoute.value.name === 'persons' || router.currentRoute.value.name === 'persons-en',
			}
		default:
			return false
	}
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
	// console.log(locale.value, 'locale.value');
	// console.log(router.currentRoute, 'router.currentRoute.value.name')
	currentLocale.value = locales.find((el) => el.value === locale.value)
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
					<RouterLink :to="applyLocale('/')">
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
						track-by="label"
						selectLabel=""
						@select="changeLocale"
					/>
					<RouterLink
						:to="applyLocale('/favourite')"
						@click="toggleMenu"
						class="header__nav-item"
					>
						<IconHeart />
					</RouterLink>

					<RouterLink
						:to="applyLocale('/movies')"
						@click="toggleMenu"
						:class="['header__nav-item', activeLink('movies')]"
					>
						{{ t('components.HeaderBlock.movies') }}
					</RouterLink>
					<RouterLink
						:to="applyLocale('/tv')"
						@click="toggleMenu"
						:class="['header__nav-item', activeLink('tv')]"
					>
						{{ t('components.HeaderBlock.tvshows') }}
					</RouterLink>
					<RouterLink
						:to="applyLocale('/persons', { query: { page: 1 } })"
						@click="toggleMenu"
						:class="['header__nav-item', activeLink('persons')]"
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
					track-by="label"
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

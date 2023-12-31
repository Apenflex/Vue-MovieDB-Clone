<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

import { userStore } from '@/stores/useUser'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { applyLocale } from '@/composables/useApplyLocale'
import IconHeart from '@/components/icons/IconHeart.vue'
import AuthButton from '@/components/auth/AuthButton.vue'

const router = useRouter()

const isMenuOpen = ref(false)
const toggleMenu = () => {
	if (isMenuOpen.value) isMenuOpen.value = false
}

const blockBodyScroll = computed(() => {
	if (isMenuOpen.value) {
		return document.body.style.overflow = 'hidden'
	} else {
		return document.body.style.overflow = ''
	}
})
watch(isMenuOpen, (newValue) => {
	newValue ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '')
})

const header = ref()
const { y } = useWindowScroll(header)
watch(y, (newValue, oldValue) => {
	if (newValue > 60 && newValue > oldValue) {
		header.value.classList.remove('header--show')
	} else {
		header.value.classList.add('header--show')
	}
})

const { t, locale, fallbackLocale } = useI18n()
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
onMounted(() => {
	// console.log(locale.value, 'locale.value');
	currentLocale.value = locales.find((el) => el.value === locale.value)
})

const userStored = userStore()
const isUserLogged = computed(() => userStored.isUserLogged)
</script>

<template>
	<header
		ref="header"
		class="header header--show"
	>
		<div class="container">
			<div class="header__wrapper">
				<!-- Logo -->
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
						v-if="isUserLogged"
						:to="applyLocale('/favourite')"
						@click="toggleMenu"
						class="header__nav-item"
					>
						<IconHeart />
					</RouterLink>

					<RouterLink
						:to="applyLocale('/movies')"
						@click="toggleMenu"
						class="header__nav-item"
					>
						{{ t('components.HeaderBlock.movies') }}
					</RouterLink>
					<RouterLink
						:to="applyLocale('/tv')"
						@click="toggleMenu"
						class="header__nav-item"
					>
						{{ t('components.HeaderBlock.tvshows') }}
					</RouterLink>
					<RouterLink
						:to="applyLocale('/persons', { query: { page: 1 } })"
						@click="toggleMenu"
						class="header__nav-item"
					>
						{{ t('components.HeaderBlock.persons') }}
					</RouterLink>
					<AuthButton @toggle-menu="toggleMenu" />
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

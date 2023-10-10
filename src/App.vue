<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onBeforeMount } from 'vue'

import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import ScrollUp from '@/components/scrollup/ScrollUp.vue'

const { locale, availableLocales, fallbackLocale } = useI18n()

const findSupportedLocale = (localeToSearch) =>
	availableLocales.find((supportedLocale) => supportedLocale === localeToSearch)

onBeforeMount(() => {
	let newLocale

	const currentPathParts = window.location.pathname.split('/')
	// console.log(currentPathParts, 'currentPathParts', currentPathParts.length, 'currentPathParts.length')

	if (currentPathParts.length === 2) {
		newLocale = findSupportedLocale(currentPathParts[1])
		// console.log(findSupportedLocale(currentPathParts[1]), 1)
	} else if (currentPathParts.length > 2) {
		newLocale = findSupportedLocale(currentPathParts[1])
		// console.log(findSupportedLocale(currentPathParts[1]), 2)
		if (!newLocale) {
			locale.value = findSupportedLocale(currentPathParts[1])
			// console.log(locale.value)
		}
	}

	if (!newLocale) {
		newLocale = fallbackLocale.value
	}

	if (locale.value !== newLocale) {
		locale.value = newLocale
	}
	// console.log(newLocale)
})
</script>

<template>
	<HeaderBlock />
	<RouterView />
	<ScrollUp />
	<FooterBlock />
</template>

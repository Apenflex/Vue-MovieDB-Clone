<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onBeforeMount } from 'vue'

import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import ScrollUp from '@/components/scrollup/ScrollUp.vue'

const { locale, availableLocales, fallbackLocale } = useI18n()

onBeforeMount(() => {
	let newLocale

	const currentPathParts = window.location.pathname.split('/')
	if (currentPathParts.length === 1) {
		newLocale = findSupportedLocale(currentPathParts[0])
	} else if (currentPathParts.length > 1) {
		newLocale = findSupportedLocale(currentPathParts[0])

		if (!newLocale) {
			locale.value = findSupportedLocale(currentPathParts[1])
		}
	}

	if (!newLocale) {
		newLocale = fallbackLocale.value
	}

	if (locale.value !== newLocale) {
		locale.value = newLocale
	}
})

const findSupportedLocale = (localeToSearch) =>
	availableLocales.find((supportedLocale) => supportedLocale === localeToSearch)
</script>

<template>
	<HeaderBlock />
	<RouterView />
	<ScrollUp />
	<FooterBlock />
</template>

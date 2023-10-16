<script setup>
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
import { useToast } from 'vue-toastification'
import { getAuth } from 'firebase/auth'
import HeaderBlock from '@/components/HeaderBlock.vue'
import ModalAuth from '@/components/modal/ModalAuth.vue'
import ScrollUp from '@/components/scrollup/ScrollUp.vue'
import FooterBlock from '@/components/FooterBlock.vue'

// Progress Bar
const router = useRouter()
const internalInstance = getCurrentInstance()
const progress = internalInstance.appContext.config.globalProperties.$Progress

const startProgress = () => progress.start()
const finishProgress = () => progress.finish()

router.beforeEach((to, from, next) => {
	if (to.meta.progress !== undefined) {
		let meta = to.meta.progress
		progress.parseMeta(meta)
	}
	startProgress()
	next()
})
router.afterEach(() => {
	finishProgress()
})
// Auth Router Guard
const toast = useToast();
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next();
    } else {
      toast.error('You must be logged in to see this page');
      next({
        // path: '/signin'
      });
    }
  } else {
    next();
  }
});

// Locale change
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
	<RouterView />
	<vue-progress-bar />
	<HeaderBlock />
	<ModalAuth />
	<ScrollUp />
	<FooterBlock />
</template>

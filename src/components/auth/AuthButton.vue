<script setup>
import { onMounted, computed } from 'vue'

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useToast } from 'vue-toastification'
import { userStore } from '@/stores/useUser'

const userStored = userStore()

const name = computed(() => (userStored.isUserLogged ? 'Sign out' : 'Sign in/Sign up'))

const auth = getAuth()
onMounted(() => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			userStored.isUserLogged = true
		} else {
			userStored.isUserLogged = false
		}
	})
})

const toast = useToast()
defineEmits(['toggle-menu'])
const handleAuth = () => {
	if (userStored.isUserLogged) {
		signOut(auth)
			.then(() => {
				userStored.isUserLogged = false
				toast.warning('You are logged out')
			})
			.catch((error) => {
				toast.error(error.message)
			})
	} else {
		userStored.showAuthModal = true
		// console.log('click', userStored.showAuthModal)
	}
}
</script>
<template>
	<button
		class="authbtn"
		@click.prevent="handleAuth"
		@click="$emit('toggle-menu')"
	>
		{{ name }}
	</button>
</template>

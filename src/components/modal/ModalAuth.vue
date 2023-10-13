<script setup>
import { reactive, ref } from 'vue'

import { userStore } from '@/stores/useUser'
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
// import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const userStored = userStore()
// const router = useRouter()
const isRegisterForm = ref(false)
const form = reactive({
	email: '',
	password: '',
})

const auth = getAuth()
const toast = useToast()
const register = () => {
	// console.log('register')
	createUserWithEmailAndPassword(auth, form.email, form.password)
		.then((data) => {
			form.email = ''
			form.password = ''
			toast.success('Succesfully registered')
			handleCloseModal()
			// console.log('Succesfully registered', data)
		})
		.catch((error) => {
			console.log('Error registering', error.code)
			switch (error.code) {
				case 'auth/email-already-in-use':
					toast.error('Email already in use')
					break
				case 'auth/invalid-email':
					toast.error('Invalid email')
					break
				case 'auth/weak-password':
					toast.error('Weak password, must be at least 6 characters')
					break
				default:
					toast.error('Email or password was incorrect')
					break
			}
		})
}
const signIn = () => {
	// console.log('register')
	signInWithEmailAndPassword(auth, form.email, form.password)
		.then((data) => {
			form.email = ''
			form.password = ''
			toast.success('Succesfully signed in')
			// console.log('Succesfully signed in', data)
			handleCloseModal()
		})
		.catch((error) => {
			// console.log(error.code)
			switch (error.code) {
				case 'auth/invalid-email':
					toast.error('Invalid email')
					break
				case 'auth/missing-password':
					toast.error('Missing password')
					break
				case 'auth/user-not-found':
					toast.error('User not found')
					break
				case 'auth/wrong-password':
					toast.error('Wrong password')
					break
				default:
					toast.error('Email or password was incorrect')
					break
			}
		})
}

const signInWithGoogle = () => {
	console.log('signInWithGoogle')
	const provider = new GoogleAuthProvider()
	signInWithPopup(getAuth(), provider)
		.then((result) => {
			// console.log(result.user)
			toast.success('Succesfully signed in with Google')
			handleCloseModal()
		})
		.catch((error) => {
			console.log(error)
		})
}

const handleCloseModal = () => {
	userStored.showAuthModal = false
}
</script>

<template>
	<div
		v-if="userStored.showAuthModal"
		class="modal-overlay"
	>
		<div class="auth__modal">
			<button
				@click="handleCloseModal"
				class="auth__modal-close"
			>
				X
			</button>
			<form class="auth__modal-form">
				<h2 v-if="!isRegisterForm">Sign in</h2>
				<h2 v-else>Sign up</h2>
				<!-- Inputs -->
				<input
					type="email"
					placeholder="Your email"
					autocomplete="email"
					v-model="form.email"
				/>
				<input
					type="password"
					placeholder="Your password"
					v-model="form.password"
				/>
				<!-- Submit buttons -->
				<button
					v-if="!isRegisterForm"
					@click.prevent="signIn"
					class="btn"
				>
					Sign in
				</button>
				<button
					v-else
					@click.prevent="register"
					class="btn"
				>
					Sign up
				</button>
				<!-- Sign with Google -->
				<button
					@click.prevent="signInWithGoogle"
					class="btn"
				>
					Sign in with Google
				</button>
				<p>
					<!-- Don't have an account? -->
					<span v-if="!isRegisterForm">Don't have an account?</span>
					<span v-else>Already have an account?</span>
					<button
						@click.prevent="isRegisterForm = !isRegisterForm"
						class="switch"
					>
						<!-- Sign up -->
						<span v-if="!isRegisterForm">Sign up</span>
						<span v-else>Sign in</span>
					</button>
				</p>
			</form>
		</div>
	</div>
</template>

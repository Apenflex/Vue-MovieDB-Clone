<script setup>
import { RouterView } from 'vue-router'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ScrollUp from '@/components/ScrollUp.vue'
</script>

<template>
	<Header />

	<RouterView />
	<ScrollUp />
	<Footer />
</template>

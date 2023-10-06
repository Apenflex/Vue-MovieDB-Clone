<script setup>
import { RouterView } from 'vue-router'

import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import ScrollUp from '@/components/scrollup/ScrollUp.vue'
</script>

<template>
	<HeaderBlock />
	<RouterView />
	<ScrollUp />
	<FooterBlock />
</template>

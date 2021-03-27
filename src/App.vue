<!-- @format -->

<template>
	<v-app>
		<update-badge></update-badge>

		<router-view></router-view>
	</v-app>
</template>

<script>
import UpdateBadge from './components/UpdateBadge.vue';

export default {
	name: 'App',
	components: {
		UpdateBadge,
	},
};
</script>

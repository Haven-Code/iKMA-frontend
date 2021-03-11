<!-- @format -->

<template>
	<v-app-bar app clipped-left elevation="0" class="ppx-border-b-2" :class="darkMode ? 'ppx-bg-custom-dark-bg' : 'ppx-bg-white ppx-border-gray-100'">
		<v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

		<v-spacer class="hidden-md-and-up"></v-spacer>

		<v-toolbar-title>Thời Khoá Biểu</v-toolbar-title>

		<div class="hidden-sm-and-down ppx-ml-20">
			<slot name="left"></slot>
		</div>

		<v-spacer></v-spacer>

		<v-btn icon @click.stop="toggleDarkMode()" class="mr-2">
			<v-icon v-if="!config.theme">fas fa-sun</v-icon>
			<v-icon v-else>fas fa-moon</v-icon>
		</v-btn>

		<v-btn icon class="mr-1">
			<v-icon>fas fa-sign-out-alt</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Navbar',
	computed: {
		...mapState(['config']),
		darkMode() {
			return this.$vuetify.theme.dark;
		},
	},
	methods: {
		toggleDrawer() {
			this.$store.dispatch('toggleDrawer');
		},
		toggleDarkMode() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			this.$store.dispatch('toggleDarkMode', this.$vuetify.theme.dark);
		},
	},
	created() {
		// if (this.config.darkMode == null) {
		// 	let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;
		// 	this.$vuetify.theme.dark = theme;
		// 	this.$store.dispatch('toggleDarkMode', theme);
		// } else {
		// 	this.$vuetify.theme.dark = this.config.darkMode || false;
		// }
	},
};
</script>

<style></style>

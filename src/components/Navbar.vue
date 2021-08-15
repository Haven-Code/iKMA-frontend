<!-- @format -->

<template>
	<v-app-bar app clipped-left elevation="0" class="ppx-border-b-2" :class="darkMode ? 'ppx-bg-custom-dark-bg' : 'ppx-bg-white ppx-border-gray-100'">
		<v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

		<v-spacer class="hidden-md-and-up"></v-spacer>

		<div class="hidden-sm-and-down ppx-ml-52">
			<slot name="left"></slot>
		</div>

		<v-toolbar-title><slot name="title"></slot></v-toolbar-title>

		<v-spacer></v-spacer>

		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon @click.stop="toggleDarkMode()" class="mr-2" v-bind="attrs" v-on="on">
					<v-icon>mdi-lightbulb</v-icon>
				</v-btn>
			</template>
			<span>Thay đổi nền sáng/tối</span>
		</v-tooltip>

		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon class="mr-1" @click.stop="logout()" v-bind="attrs" v-on="on">
					<v-icon>mdi-logout-variant</v-icon>
				</v-btn>
			</template>
			<span>Đăng xuất</span>
		</v-tooltip>
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
		logout() {
			this.$swal({
				icon: 'question',
				title: 'Bạn có muốn đăng xuất ?',
				showConfirmButton: true,
				showCancelButton: true,
				reverseButtons: true,
				confirmButtonText: 'Đồng Ý',
				cancelButtonText: 'Đóng',
			}).then((res) => {
				if (res.isConfirmed) {
					this.$store.dispatch('logout');
					this.$router.push({
						name: 'Auth',
					});
				}
			});
		},
	},
	created() {
		if (this.config.darkMode === null) {
			let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;
			this.$vuetify.theme.dark = theme;
			this.$store.dispatch('toggleDarkMode', theme);
		} else {
			this.$vuetify.theme.dark = this.config.darkMode || false;
		}
	},
};
</script>

<style></style>

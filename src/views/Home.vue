<!-- @format -->

<template>
	<v-app id="home">
		<Sidebar />

		<router-view></router-view>
	</v-app>
</template>

<script>
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';

export default {
	name: 'Home',
	components: {
		Sidebar,
		// Navbar,
	},
	data: () => ({
		drawer: true,
	}),
};
</script>

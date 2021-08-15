<!-- @format -->

<template>
	<v-main>
		<navbar></navbar>

		<v-container fill-height fluid class="pa-0" :class="{ 'ppx-bg-gray-200': !this.$vuetify.theme.dark }">
			<v-flex fill-height>
				<!-- <v-sheet rounded="lg" class="mt-1 px-5 py-4 pb-7 icsBox px-3">
					<p class="text-center ppx-text-2xl ppx-font-medium">Bảng Điểm Theo Môn</p>

					
				</v-sheet> -->

				<v-sheet rounded="lg" class="mx-3 mt-2 px-5 py-4 pb-7 icsBox px-3">
					<p class="text-center ppx-text-3xl ppx-font-medium">CUMMING SOON 😘😘</p>
				</v-sheet>
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
export default {
	name: 'PWA',
	components: { Navbar },
};
</script>

<style></style>

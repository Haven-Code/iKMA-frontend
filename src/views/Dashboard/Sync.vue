<!-- @format -->

<template>
	<v-main>
		<navbar></navbar>

		<v-container fill-height fluid class="pa-0">
			<v-flex fill-height>
				<v-sheet rounded="lg" elevation="0" class="mx-3 mt-3 px-10 py-4 syncBox px-3">
					<p class="text-center ppx-text-2xl ppx-font-medium">Nhập TKB vào Lịch Google / Microsoft</p>

					<v-row class="mt-6">
						<v-col cols="12" md="6">
							<center>
								<v-btn class="ppx-bg-red-600 ppx-rounded-lg hover:ppx-bg-red-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in" large dark>
									<v-icon class="mr-3">fab fa-google</v-icon>
									Đăng Nhập Với Google
								</v-btn>
								<br />
								<v-btn class="mt-3 ppx-bg-purple-600 ppx-rounded-lg hover:ppx-bg-purple-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in " large dark>
									<v-icon class="mr-3">fas fa-upload</v-icon>
									Nhập Vào Lịch Google
								</v-btn>
							</center>
						</v-col>

						<v-col cols="12" md="6">
							<center>
								<v-btn class="ppx-bg-blue-600 ppx-rounded-lg hover:ppx-bg-blue-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in" large dark>
									<v-icon class="mr-3">fab fa-microsoft</v-icon>
									Đăng Nhập Với Microsoft
								</v-btn>
								<br />
								<v-btn class="mt-3 ppx-bg-purple-600 ppx-rounded-lg hover:ppx-bg-purple-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in " large dark>
									<v-icon class="mr-3">fas fa-upload</v-icon>
									Nhập Vào Lịch Microsoft
								</v-btn>
							</center>
						</v-col>
					</v-row>

					<v-divider class="mt-5 mb-3"></v-divider>

					<div class="console ppx-bg-gray-400 mt-5 ppx-h-96 ppx-text-gray-100 px-4 py-3 ppx-rounded-lg ppx-shadow-sm mb-2">
						jnfjlebfje fwjefbje
					</div>
				</v-sheet>
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
export default {
	components: { Navbar },
	name: 'Sync',
};
</script>

<style></style>

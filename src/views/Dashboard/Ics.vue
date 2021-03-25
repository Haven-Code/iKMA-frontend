<!-- @format -->

<template>
	<v-main>
		<navbar></navbar>

		<v-container fill-height fluid class="pa-0">
			<v-flex fill-height>
				<v-sheet elevation="1" rounded="lg" class="mx-3 mt-2 px-5 py-4 pb-7 icsBox px-3">
					<p class="text-center ppx-text-2xl ppx-font-medium">Xuất File Icalendar (.ics)</p>

					<center>
						<v-btn large color="primary" class="mt-3">
							<v-icon class="mr-3">fas fa-file-export</v-icon>
							Xuất File
						</v-btn>

						<br />

						<v-btn large class="mt-3" color="success" v-if="!buttonDownload.hide">
							<v-icon class="mr-3">fas fa-file-download</v-icon>
							Tải Xuống
						</v-btn>
					</center>
				</v-sheet>
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
	import Navbar from '../../components/Navbar.vue'
	import { mapState } from 'vuex'

	export default {
		components: { Navbar },
		name: 'Ics',
		data: () => ({
			buttonExport: {
				loading: false,
			},
			buttonDownload: {
				hide: true,
				loading: false,
			},
		}),
		computed: {
			...mapState(['user']),
		},
		methods: {
			createIcs() {
				
			},
		},
	}
</script>

<style></style>

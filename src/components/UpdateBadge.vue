<!-- @format -->

<template>
	<v-sheet v-if="showUpdateUI" class="ppx-text-center ppx-p-2 ppx-py-3 ppx-absolute ppx-z-10 ppx-bottom-5 ppx-right-5 ppx-rounded-lg ppx-w-60">
		<p class="ppx-text-md ppx-m-0 ppx-font-medium">
			Vừa có phiên bản mới ! <br />
			Ấn nút bên dưới để cập nhật !
		</p>

		<v-btn class="ppx-mt-3 ppx-mb-1" color="info" elevation="0" @click.stop="accept()">Cập Nhật</v-btn>
	</v-sheet>
</template>

<script>
export default {
	name: 'UpdateBadge',
	data: () => ({
		showUpdateUI: false,
	}),
	methods: {
		async accept() {
			this.showUpdateUI = false;
			await this.$workbox.messageSW({ type: 'SKIP_WAITING' });
		},
	},
	created() {
		if (this.$workbox) {
			this.$workbox.addEventListener('waiting', () => {
				this.showUpdateUI = true;
			});
		}
	},
};
</script>

<style></style>

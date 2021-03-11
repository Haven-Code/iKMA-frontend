<!-- @format -->

<template>
	<v-container fluid class="fill-height grey lighten-4">
		<v-row align="center" justify="center">
			<v-col cols="11" md="6" lg="4">
				<v-card min-height="40vh" class="py-5 px-11 ppx-rounded-xl ppx-shadow-xl">
					<p class="mt-2 text-center text-h5 font-weight-light">Đăng Nhập Bằng Tài Khoản <strong>ACTVN</strong></p>

					<center>
						<v-img class="mt-5" src="@/assets/logo.png" width="6rem" height="6rem" alt="KMA Schedule Logo"></v-img>
					</center>

					<v-form ref="form" v-model="form.valid" lazy-validation class="mt-7">
						<v-text-field class="ppx-rounded-lg" v-model="form.studentCode" :rules="form.rules.studentCode" label="Mã Sinh Viên" outlined dense prepend-inner-icon="fas fa-user" required></v-text-field>

						<v-text-field class="ppx-rounded-lg mt-n3" v-model="form.password" :rules="form.rules.password" label="Mật Khẩu" outlined dense prepend-inner-icon="fas fa-key" required></v-text-field>

						<a href="http://qldt.actvn.edu.vn/CMCSoft.IU.Web.Info/LostPassword.aspx" target="_blank"><p class="text-subtitle-2 mt-n4 mr-2 text-right font-weight-light">Quên Mật Khẩu ?</p></a>

						<v-btn class="ppx-rounded-lg ppx-h-11 mt-6" color="purple" dark block @click="login">
							<i class="fas fa-sign-in-alt mr-2 fa-lg"></i>
							<span class="text-body-1">Đăng Nhập</span>
						</v-btn>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Auth',
	data: () => ({
		form: {
			valid: null,
			rules: {
				studentCode: [(v) => !!v || 'Bắt Buộc Mã Sinh Viên'],
				password: [(v) => !!v || 'Bắt Buộc Mật Khẩu'],
			},
			studentCode: null,
			password: null,
		},
	}),
	computed: {
		...mapState(['user']),
	},
	methods: {
		toggleDarkMode() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			this.$store.dispatch('toggleDarkMode', this.$vuetify.theme.dark);
		},
		login() {
			if (this.$refs.form.validate()) {
				console.log('PK');
			} else {
				this.$toast.open({
					message: 'Thiếu Gì Rùi!',
					type: 'error',
					position: 'top-right'
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>

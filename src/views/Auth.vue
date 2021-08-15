<!-- @format -->

<template>
	<v-container fluid class="fill-height" :class="!darkMode ? 'grey lighten-4' : ''">
		<v-row align="center" justify="center">
			<v-col cols="11" md="7" lg="5">
				<v-card min-height="40vh" class="py-5 px-11 ppx-rounded-xl ppx-shadow-xl">
					<p class="mt-2 text-center text-h5 font-weight-light">Đăng Nhập Bằng Tài Khoản <strong>ACTVN</strong></p>

					<center>
						<v-img class="mt-5" src="@/assets/logo.png" width="6rem" height="6rem" alt="KMA Schedule Logo"></v-img>
					</center>

					<v-form ref="form" v-model="form.valid" lazy-validation class="mt-7">
						<v-text-field
							:disabled="form.loading"
							v-on:keyup.enter="login()"
							class="ppx-rounded-lg"
							v-model="form.studentCode"
							:rules="form.rules.studentCode"
							label="Mã Sinh Viên"
							outlined
							dense
							prepend-inner-icon="mdi-account"
							required
						></v-text-field>

						<v-text-field
							:disabled="form.loading"
							v-on:keyup.enter="login()"
							class="ppx-rounded-lg mt-n3"
							v-model="form.password"
							type="password"
							:rules="form.rules.password"
							label="Mật Khẩu"
							outlined
							dense
							prepend-inner-icon="mdi-account-key"
							required
						></v-text-field>

						<a href="http://qldt.actvn.edu.vn/CMCSoft.IU.Web.Info/LostPassword.aspx" target="_blank"
							><p class="text-subtitle-2 mt-n4 mr-2 text-right font-weight-light">Quên Mật Khẩu ?</p></a
						>

						<v-btn class="ppx-rounded-lg ppx-h-11 mt-6" :loading="form.loading" color="purple" dark block @click="login">
							<v-icon class="mr-2">mdi-login-variant</v-icon>
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
import axios from 'axios';

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
			loading: false,
		},
		darkMode: null,
	}),
	computed: {
		...mapState(['user', 'config']),
	},
	metaInfo: {
		title: 'Đăng Nhập',
		titleTemplate: ' %s | iKMA',
	},
	methods: {
		login() {
			this.form.loading = true;

			if (this.$refs.form.validate()) {
				const param = {
					username: this.form.studentCode,
					password: this.form.password,
				};

				const header = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				};

				axios
					.post(process.env.VUE_APP_API_URL, param, header)
					.then((res) => {
						const { code, data } = res.data;

						if (code == 403 || !data) {
							this.form.loading = false;
							return this.$toast.error('<strong>Lỗi</strong>: Sai tài khoản hoặc mật khẩu!');
						} else if (code == 401) {
							this.form.loading = false;
							return this.$toast.error('<strong>Lỗi</strong>: Website trường lỗi! Thử lại sau ít phút!');
						}

						// const { studentInfo, studentSchedule } = data;

						// console.log(studentInfo);
						// console.log(studentSchedule);

						this.$store.dispatch('login', data);

						this.$toast.success('Đăng Nhập Thành Công');

						setTimeout(() => {
							this.$router.push({
								name: 'Home',
							});
						}, 1000);
					})
					.catch((err) => {
						this.form.loading = false;

						this.$toast.error('<strong>Lỗi</strong>: ' + err);

						throw new Error(err);
					});
			} else {
				this.$toast.error('Thiếu Gì Rùi!');
				this.form.loading = false;
			}
		},
	},
	created() {
		if (this.config.darkMode === null) {
			let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;
			this.$vuetify.theme.dark = theme;
			this.$store.dispatch('toggleDarkMode', theme);
			this.darkMode = theme;
		} else {
			this.$vuetify.theme.dark = this.config.darkMode || false;
			this.darkMode = this.config.darkMode || false;
		}
	},
};
</script>

<style lang="scss" scoped></style>

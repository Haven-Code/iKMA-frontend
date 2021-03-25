<!-- @format -->

<template>
	<v-main>
		<navbar></navbar>

		<v-container fill-height fluid class="pa-0">
			<v-flex fill-height>
				<div class="donateTable mt-5 ppx-px-5 md:ppx-px-16 text-center">
					<p class="text-center ppx-text-2xl mt-2 ppx-font-medium">Ủng Hộ Nhà Phát Triển</p>
					<p class="text-center ppx-text-md mt-n2 ppx-text-red-500">Lưu ý: Mọi khoản ủng hộ sẽ không được hoàn lại dưới mọi hình thức!</p>
					<p class="text-center mt-n3 ppx-text-lg ppx-font-semibold">Mình cảm ơn :)))</p>

					<v-expansion-panels accordion class="ppx-font-semibold mt-5">
						<v-expansion-panel>
							<v-expansion-panel-header>Ngân Hàng Quân Đội (MB Bank)</v-expansion-panel-header>

							<v-expansion-panel-content>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">4100172376886</p>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">DANG HOANG PHUC</p>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">Chi Nhánh Hội Sở Chính</p>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Ngân Hàng Bản Việt (Vietcapital Bank - Timo)</v-expansion-panel-header>

							<v-expansion-panel-content>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">9007041031813</p>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">DANG HOANG PHUC</p>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">Chi Nhánh Hội Sở</p>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Ngân Hàng NN & PTNT (Agribank)</v-expansion-panel-header>

							<v-expansion-panel-content>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">1401205101015</p>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">DANG HOANG PHUC</p>
								<p class="ppx-font-semibold ma-0 ppx-leading-relaxed">Chi Nhánh Hà Nội I</p>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Momo</v-expansion-panel-header>

							<v-expansion-panel-content>
								<center>
									<v-img class="md:ppx-w-1/5 sm:ppx-w-full md:ppx-h-1/5" src="@/assets/donate/momo.png"></v-img>
									<a href="https://nhantien.momo.vn/Gjs532xiR34" target="_blank">https://nhantien.momo.vn/Gjs532xiR34</a>
								</center>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Viettel Pay</v-expansion-panel-header>

							<v-expansion-panel-content>
								<center>
									<v-img class="ppx-w-1/4 ppx-h-1/4" src="@/assets/donate/vtpay.jpg"></v-img>
								</center>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>PlayerDuo</v-expansion-panel-header>

							<v-expansion-panel-content>
								<center>
									<a href="https://playerduo.com/phucpx" target="_blank">https://playerduo.com/phucpx</a>
								</center>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Wescan Siêu Tốc</v-expansion-panel-header>

							<v-expansion-panel-content>
								<center>
									<a href="https://app.wescan.vn/phuc.px.371" target="_blank">https://app.wescan.vn/phuc.px.371</a>
								</center>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Paypal</v-expansion-panel-header>

							<v-expansion-panel-content>
								<center>
									<a href="https://paypal.me/phuchptty" target="_blank">
										<v-img class="ppx-w-1/6" src="https://img.shields.io/badge/paypal-%2300457C.svg?&style=for-the-badge&logo=paypal&logoColor=white"></v-img>
									</a>
								</center>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Buy Me A Coffee</v-expansion-panel-header>

							<v-expansion-panel-content>
								<center>
									<a href="https://www.buymeacoffee.com/phuchptty" class="ma-0 pa-0" target="_blank">
										<v-img class="ppx-w-1/5" src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee"></v-img>
									</a>
								</center>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</div>
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
export default {
	name: 'Donate',
	components: { Navbar },
	metaInfo: {
		title: 'Ủng Hộ Nhà Phát Triển',
		titleTemplate: ' %s | KMA Schedule',
	},
};
</script>

<style></style>

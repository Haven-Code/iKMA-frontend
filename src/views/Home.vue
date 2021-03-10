<!-- @format -->

<template>
	<v-app id="home">
		<v-navigation-drawer v-model="drawer" clipped app bottom>
			<template v-slot:prepend>
				<div class="ppx-align-baseline ppx-text-center mt-2">
					<v-img class="ppx-inline-block ppx-align-middle" src="../assets/logo.png" width="60" height="60" alt="Logo"></v-img>
					<p class="ppx-inline-block ppx-text-3xl ppx-font-bold ppx-align-middle mt-5 ml-3">iKMA</p>
				</div>
			</template>

			<v-list nav class="px-4 mt-2">
				<v-list-item link class="hidden-md-and-up">
					<v-list-item-avatar color="grey lighten-1">
						<v-img
							alt="Avatar"
							src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Blue03&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
						></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title class="ppx-text-lg ppx-font-medium">
							Đặng Hoàng Phúc
						</v-list-item-title>
						<v-list-item-subtitle class="ppx-text-sm ppx-font-normal">AT160340</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-divider class="ma-0 mb-1 mt-n2 hidden-md-and-up"></v-divider>

				<v-list-item link>
					<v-list-item-icon>
						<v-icon>fas fa-calendar-alt</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="ppx-font-normal ppx-text-lg">Thời Khoá Biểu</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link>
					<v-list-item-icon>
						<v-icon>fas fa-graduation-cap</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="ppx-font-normal ppx-text-lg">Bảng Điểm</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link>
					<v-list-item-icon>
						<v-icon>fas fa-sync-alt</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="ppx-font-normal ppx-text-lg">Đồng Bộ Hoá</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link>
					<v-list-item-icon>
						<v-icon>fas fa-tools</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="ppx-font-normal ppx-text-lg">Xuất File Ics</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link class="hidden-md-and-up">
					<v-list-item-icon>
						<v-icon>fas fa-mobile-alt</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="ppx-font-normal ppx-text-lg">Cài Đặt PWA</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link class="hidden-md-and-up">
					<v-list-item-icon>
						<v-icon>fas fa-hand-holding-heart</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="ppx-font-normal ppx-text-lg">Ủng Hộ Tác Giả</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<template v-slot:append>
				<v-list nav class="px-4 hidden-sm-and-down">
					<v-list-item link>
						<v-list-item-avatar color="grey lighten-1">
							<v-img
								alt="Avatar"
								src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Blue03&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
							></v-img>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title class="ppx-text-lg ppx-font-medium">
								Đặng Hoàng Phúc
							</v-list-item-title>
							<v-list-item-subtitle class="ppx-text-sm ppx-font-normal">AT160340</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-divider class="ma-0 mb-1 mt-n1"></v-divider>

					<v-list-item link>
						<v-list-item-icon>
							<v-icon>fas fa-mobile-alt</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title class="ppx-font-normal ppx-text-lg">Cài Đặt PWA</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link>
						<v-list-item-icon>
							<v-icon>fas fa-hand-holding-heart</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title class="ppx-font-normal ppx-text-lg">Ủng Hộ Tác Giả</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<div class="copyright px-3 mb-2 text-center ppx-text-md">
					<p class="ma-o ppx-mb-0.5">Copyright &copy; 2021 <a href="https://havencode.net" target="_blank">Haven Code</a></p>
					<p class="ma-0 ppx-text-sm">Powered By <a href="https://danghoangphuc.com" target="_blank">Lucas Dang</a></p>
				</div>
			</template>
		</v-navigation-drawer>

		<v-app-bar app clipped-left elevation="0" class="ppx-bg-white ppx-border-b-2 ppx-border-gray-200">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Application</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<!--  -->
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'Home',
	data: () => ({
		drawer: true,
	}),
};
</script>

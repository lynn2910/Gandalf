<template>
	<div id="app">
		<nav class="w-screen py-3 px-5 flex flex-row justify-start gap-3 select-none shadow mb-5">
			<router-link :to="{name:'home'}">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-black">
					<path
							d="M3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .913-.593.998.998 0 0 0-.17-1.076l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10A1 1 0 0 0 3 14zm5.949-.316C8.98 13.779 9.762 16 12 16c2.269 0 3.042-2.287 3.05-2.311l1.9.621C16.901 14.461 15.703 18 12 18s-4.901-3.539-4.95-3.689l1.899-.627z"></path>
				</svg>
			</router-link>

			<router-link class="hover:underline" :to="{name:'home'}">Home</router-link>
			|
			<router-link class="hover:underline" :to="{name:'login'}">Connexion</router-link>
			|
			<router-link class="hover:underline" :to="{name:'register'}">Créer un compte</router-link>
			|
			<router-link class="hover:underline" :to="{name:'secured'}">Espace sécurisé</router-link>
		</nav>
		<router-view/>
	</div>
</template>

<script>
export default {

	watch: {
		'$route': {
			immediate: true,
			handler(newRoute) {
				let title = "App";
				if (newRoute?.meta?.title) {
					title = newRoute.meta.title;
				}

				document.title = title;
			}
		}
	},
}
</script>
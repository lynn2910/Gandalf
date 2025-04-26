<template>
	<div id="app" class="text-black dark:text-white h-screen max-w-screen">
		<!-- Navigation bar -->
		<div class="navbar absolute bg-base-100 shadow-sm px-10 flex flex-row z-50">
			<div class="flex-1">
				<router-link :to="{name:'home'}" class="btn btn-ghost text-xl">OAuth2 & Chat</router-link>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-10">
					<li>
						<router-link :to="{name:'secured'}" :disabled="user === null" type="button" class="btn btn-soft">
							Chat
						</router-link>
					</li>
					<li></li>
					<li>
						<router-link v-if="!user" :to="{name:'login'}" type="button" class="btn btn-accent">
							Login
						</router-link>
						<button v-else type="button" class="btn btn-neutral" @click.prevent="logoutUser">Logout</button>
					</li>
				</ul>
			</div>
		</div>

		<div class="w-full h-full bg-base-200 overflow-y-scroll">
			<router-view/>
		</div>

	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
	computed: {
		...mapState(["user"])
	},
	methods: {
		...mapActions(['fetchUser', 'logout']),
		async logoutUser() {
			await this.logout();
			await this.$router.push({name: 'login'})
		}
	},
	async beforeMount() {
		try {
			await this.fetchUser();
		} catch (_) {
		}
	},
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

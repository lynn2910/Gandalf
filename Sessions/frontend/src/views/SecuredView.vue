<template>
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold text-primary">Bienvenue, {{ user?.username }}!</h1>
				<p class="py-6 text-lg">
					Vous êtes connecté à votre espace personnel.
				</p>
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">Informations du compte</h2>
						<p>Nom d'utilisateur: <span class="font-semibold">{{ user?.username }}</span></p>
						<p>Email: <span class="font-semibold">{{ user?.email }}</span></p>
						<div class="card-actions justify-end mt-4">
							<button class="btn btn-neutral" @click.prevent="update">Mettre à jour</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
	name: "SecuredView.vue",
	computed: {
		...mapState(['user'])
	},
	methods: {
		...mapActions(['fetchUser']),
		async update() {
			try {
				await this.fetchUser()
				alert("mise à jour réussie")
			} catch (_) {
				alert("échec de la mise à jour")
			}
		}
	},
	async beforeMount() {
		if (!this.user) {
			await this.$router.push({name: 'login'})
		}
	}
}
</script>

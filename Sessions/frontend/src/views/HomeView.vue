<template>
	<div class="home bg-base-200 min-h-screen flex justify-center items-center mt-10">
		<div class="card bg-base-100 shadow-xl p-10 w-full max-w-xl">
			<div class="card-body">
				<h1 class="text-3xl font-bold text-center mb-6">
					Bienvenue sur notre Application d'Authentification
				</h1>
				<p class="mb-4 text-lg text-justify text-gray-700 dark:text-gray-400">
					Ce mini-projet, réalisé par <span class="font-semibold dark:text-gray-200">Cédric COLIN</span> et <span
						class="font-semibold dark:text-gray-200">Marvyn LEVIN</span>,
					démontre un système d'authentification complet basé sur un système de <span
						class="font-semibold dark:text-gray-200">session</span> avec les fonctionnalités suivantes :
				</p>

				<div class="mb-6">
					<h2 class="text-2xl font-semibold mb-3 text-primary">Fonctionnalités Clés</h2>
					<ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-base">
						<li>
							<span class="font-semibold">Inscription d'utilisateurs :</span>
							Créez un compte sécurisé.
						</li>
						<li>
							<span class="font-semibold">Connexion sécurisée :</span>
							Accédez à votre espace personnel après vérification de vos identifiants.
						</li>
						<li>
							<span class="font-semibold">Déconnexion :</span>
							Quittez votre session en toute sécurité.
						</li>
						<li><span class="font-semibold">Page Sécurisée :</span>
							Un espace accessible uniquement aux utilisateurs connectés.
						</li>
						<li><span class="font-semibold">Requête Authentifiée :</span>
							Un bouton sur la page sécurisée pour tester une requête nécessitant une connexion.
						</li>
					</ul>
				</div>

				<div class="flex justify-center space-x-4 mt-8">
					<router-link v-if="!user" :to="{name:'login'}" class="btn btn-primary">
						Se Connecter
					</router-link>
					<router-link v-if="!user" :to="{name:'register'}" class="btn btn-secondary">
						S'inscrire
					</router-link>
					<button v-if="user" type="button" @click.prevent="logout" class="btn btn-active">
						Se déconnecter
					</button>
				</div>

				<div class="mt-8 text-center">
					<p class="text-sm text-gray-500">
						<span class="font-semibold">Projet réalisé par :</span> Cédric COLIN & Marvyn LEVIN
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import App from "@/App.vue";

export default {
	name: 'HomeView',
	components: {App},
	computed: {
		...mapState(['user'])
	},
	methods: {
		...mapActions(['logout']),
	}
}
</script>
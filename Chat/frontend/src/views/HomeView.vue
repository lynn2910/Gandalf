<template>
	<div class="home bg-base-200 min-h-screen flex justify-center items-center">
		<div class="card bg-base-100 shadow-xl p-10 w-full max-w-4xl">
			<div class="card-body">
				<h1 class="text-3xl font-bold text-center mb-6">
					Bienvenue sur notre Application d'Authentification Sécurisée
				</h1>
				<p class="mb-4 text-lg text-justify text-gray-700 dark:text-gray-400">
					Ce mini-projet, réalisé par <span class="font-semibold dark:text-gray-200">Cédric COLIN</span> et <span
						class="font-semibold dark:text-gray-200">Marvyn LEVIN</span>,
					démontre un système d'authentification robuste utilisant <span
						class="font-semibold dark:text-gray-200">OAuth2 avec Google</span>, couplé à un système de <span
						class="font-semibold dark:text-gray-200">chat en temps réel</span>.
					L'application met en œuvre une authentification moderne et sécurisée, enrichie par une messagerie instantanée
					accessible une fois authentifié.
				</p>

				<div class="mb-6">
					<h2 class="text-2xl font-semibold mb-3 text-primary">Fonctionnalités Clés</h2>
					<ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-base">
						<li>
							<span class="font-semibold">Authentification OAuth2 via Google :</span>
							Connectez-vous facilement et en toute sécurité en utilisant votre compte Google.
						</li>
						<li>
							<span class="font-semibold">Chat en Temps Réel :</span>
							Communiquez instantanément avec d'autres utilisateurs connectés via une interface de chat intuitive,
							accessible sur la page <a href="/secured" class="font-semibold text-primary">`/secured`</a>.
						</li>
						<li>
							<span class="font-semibold">Gestion des Sessions Sécurisée :</span>
							Sessions utilisateur mises en cache avec Redis pour une performance optimale et une gestion efficace.
						</li>
						<li>
							<span class="font-semibold">Stockage de l'Historique des Messages :</span>
							L'historique de vos conversations est sauvegardé dans une base de données MongoDB, vous permettant de
							retrouver vos échanges précédents.
						</li>
						<li>
							<span class="font-semibold">Page Sécurisée :</span>
							Un espace exclusif et sécurisé, accessible uniquement après authentification réussie via Google,
							hébergeant le système de chat.
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
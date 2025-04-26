<template>
	<div class="home bg-base-200 min-h-screen flex justify-center items-center mt-20">
		<div class="card bg-base-100 shadow-xl p-5 w-full max-w-4xl">
			<div class="card-body">
				<h1 class="text-3xl font-bold text-center mb-6">
					Mini-projet 3 : Authentification OAuth2 avec Google et Chat en temps réel
				</h1>
				<p class="mb-4 text-lg text-justify text-gray-700 dark:text-gray-400">
					Ce mini-projet, réalisé par <span class="font-semibold dark:text-gray-200">Cédric COLIN</span> et <span
						class="font-semibold dark:text-gray-200">Marvyn LEVIN</span>,
					implémente une authentification OAuth2 via <span
						class="font-semibold dark:text-gray-200">Google et Discord</span>, couplée à un système de <span
						class="font-semibold dark:text-gray-200">messagerie instantanée en temps réel</span> entre utilisateurs connectés.
					L'application met en œuvre une authentification moderne et sécurisée, enrichie par une messagerie instantanée
					accessible une fois authentifié.
				</p>

				<div class="mb-3">
					<h2 class="text-2xl font-semibold mb-3 text-primary">Fonctionnalités Clés</h2>
					<ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-base">
						<li>
							<span class="font-semibold">Authentification OAuth2 via Google et Discord :</span>
							Connectez-vous facilement et en toute sécurité en utilisant votre compte Google ou Discord.
						</li>
						<li>
							<span class="font-semibold">Stockage des utilisateurs et tokens dans MongoDB :</span>
							Vos informations utilisateur et jetons d'authentification sont stockés de manière sécurisée dans MongoDB.
						</li>
						<li>
							<span class="font-semibold">Mise en cache des sessions avec Redis :</span>
							Sessions utilisateur mises en cache avec Redis pour une performance optimale et une gestion efficace.
						</li>
						<li>
							<span class="font-semibold">Interface de chat entre utilisateurs connectés :</span>
							Communiquez instantanément avec d'autres utilisateurs connectés via une interface de chat intuitive,
							accessible sur la page <a href="/secured" class="font-semibold text-primary">`/secured`</a>.
						</li>
						<li>
							<span class="font-semibold">Stockage de l'historique des messages dans MongoDB :</span>
							L'historique de vos conversations est sauvegardé dans une base de données MongoDB, vous permettant de
							retrouver vos échanges précédents.
						</li>
					</ul>
				</div>

				<div class="mb-3">
					<h2 class="text-2xl font-semibold mb-3 text-primary">Objectifs pédagogiques</h2>
					<ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-base">
						<li>
							<span class="font-semibold">Comprendre les différentes méthodes d'authentification</span>
						</li>
						<li>
							<span class="font-semibold">Maîtriser la gestion des sessions via cookies et JWT</span>
						</li>
						<li>
							<span class="font-semibold">Implémenter une authentification OAuth2 avec un fournisseur tiers</span>
						</li>
						<li>
							<span class="font-semibold">Mettre en place un système de chat en temps réel</span>
						</li>
						<li>
							<span class="font-semibold">Optimiser la gestion des sessions avec Redis</span>
						</li>
					</ul>
				</div>

				<div class="flex justify-center space-x-4 mt-4">
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

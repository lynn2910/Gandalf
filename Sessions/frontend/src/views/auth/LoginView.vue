<template>
	<div
			class="hero absolute z-0 top-0 left-0 h-screen w-screen lg:relative lg:h-screen bg-base-200 lg:overflow-y-hidden">
		<div class="hero-content flex-col lg:flex-row-reverse lg:gap-20 w-full lg:w-2/5">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Connexion</h1>
				<p class="py-6">Connectez-vous pour accéder à votre espace personnel.</p>
			</div>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<h2 class="text-2xl font-semibold text-center mb-4">Connexion</h2>

					<form @submit.prevent="login" class="space-y-7">

						<!-- Mail -->
						<fieldset class="form-control fieldset">
							<legend class="fieldset-legend">Email</legend>
							<label class="input validator">
								<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
										 stroke="currentColor">
										<rect width="20" height="16" x="2" y="4" rx="2"></rect>
										<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
									</g>
								</svg>
								<input v-model="loginForm.email" type="email" placeholder="mail@site.com" required/>
							</label>
							<div class="validator-hint hidden">Enter valid email address</div>
						</fieldset>

						<!-- mot de passe-->
						<fieldset class="form-control fieldset">
							<legend class="fieldset-legend">Mot de passe</legend>
							<label class="input validator">
								<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
										 stroke="currentColor">
										<path
												d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
										<circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
									</g>
								</svg>
								<input v-model="loginForm.password" type="password" required placeholder="Password" minlength="1"
											 title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"/>
							</label>
						</fieldset>

						<!-- Login btn -->
						<div class="form-control mt-6 mx-auto">
							<button type="submit" class="btn btn-primary">Se Connecter</button>
						</div>
					</form>

					<div class="text-center mt-4">
						<p>Pas de compte ?
							<router-link :to="{name:'signup'}" class="link link-primary">Créer un compte</router-link>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
	name: "LoginView",
	computed: {
		...mapState(['user']),
	},
	data() {
		return {
			loginForm: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions(['loginUser']),
		login() {
			this.loginUser(this.loginForm)
		}
	},
	watch: {
		user(newUser, _) {
			if (newUser) {
				this.$router.push({name: 'secured'})
			}
		}
	}
}
</script>

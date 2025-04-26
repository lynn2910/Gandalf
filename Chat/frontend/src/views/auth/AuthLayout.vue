<template>
	<div
			class="hero absolute z-0 top-0 left-0 h-screen w-screen lg:relative lg:h-screen bg-base-200 lg:overflow-y-hidden">
		<div class="hero-content flex-col lg:flex-row-reverse lg:gap-20 w-full lg:w-2/5">
			<!--			<div class="text-center lg:text-left">-->
			<!--				<h1 class="text-5xl font-bold">Authentification</h1>-->
			<!--				<p class="py-6">Connectez-vous avec votre email et mot de passe ou via Google ou Discord pour accéder au chat en temps réel.</p>-->
			<!--			</div>-->
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<h2 class="text-2xl font-semibold text-center mb-4">Connexion</h2>

					<form @submit.prevent="login">
						<div class="form-control">
							<label class="label">
								<span class="label-text">Email</span>
							</label>
							<input
									type="email"
									placeholder="Email"
									class="input input-bordered"
									v-model="loginForm.email"
									required
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Mot de passe</span>
							</label>
							<input
									type="password"
									placeholder="Mot de passe"
									class="input input-bordered"
									v-model="loginForm.password"
									required
							/>
						</div>

						<div class="form-control mt-6">
							<button type="submit" class="btn btn-primary" :disabled="loading">
								{{ loading ? 'Connexion en cours...' : 'Se connecter' }}
							</button>
						</div>

						<div v-if="error" class="alert alert-error mt-4">
							<div>
								<span>{{ error }}</span>
							</div>
						</div>
					</form>

					<div class="divider">OU</div>

					<div class="flex flex-col gap-2">
						<a href="http://localhost:5000/auth/google" class="btn btn-outline">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google"
									 viewBox="0 0 16 16">
								<path
										d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
							</svg>
							Se connecter avec Google
						</a>
						<a href="http://localhost:5000/auth/discord" class="btn btn-outline">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord"
									 viewBox="0 0 16 16">
								<path
										d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
							</svg>
							Se connecter avec Discord
						</a>
					</div>

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
	name: "AuthLayout",
	computed: {
		...mapState(['user']),
	},
	data() {
		return {
			loginForm: {
				email: '',
				password: ''
			},
			error: null,
			loading: false
		}
	},
	methods: {
		...mapActions(['loginUser']),
		async login() {
			this.error = null;
			this.loading = true;

			try {
				// Validation
				if (!this.loginForm.email || !this.loginForm.password) {
					this.error = 'Tous les champs sont obligatoires';
					return;
				}

				// Login user
				await this.loginUser(this.loginForm);

				// If user is set, login was successful
				if (!this.user) {
					this.error = 'Email ou mot de passe incorrect';
				}
			} catch (error) {
				this.error = error.message || 'Erreur lors de la connexion';
			} finally {
				this.loading = false;
			}
		}
	},
	async beforeMount() {
		if (this.user) {
			await this.$router.push({name: 'secured'})
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

<template>
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col lg:flex-row-reverse gap-20 w-2/5">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Créer un compte</h1>
				<p class="py-6">Créez un compte pour commencer à utiliser notre service.</p>
			</div>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<h2 class="text-2xl font-semibold text-center mb-4">Créer un compte</h2>

					<form @submit.prevent="register" class="space-y-7">

						<!-- Nom -->
						<fieldset class="form-control fieldset">
							<legend class="fieldset-legend">Nom d'utilisateur</legend>
							<label class="input validator">
								<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
										 stroke="currentColor">
										<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
										<circle cx="12" cy="7" r="4"></circle>
									</g>
								</svg>
								<input type="text" v-model="registerForm.username" required placeholder="Username"
											 pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30"
											 title="Only letters, numbers or dash"/>
							</label>
							<p class="validator-hint hidden">
								Must be 3 to 30 characters
								<br/>containing only letters, numbers or dash
							</p>
						</fieldset>

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
								<input v-model="registerForm.email" type="email" placeholder="mail@site.com" required/>
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
								<input v-model="registerForm.password" type="password" required placeholder="Password" minlength="8"
											 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
											 title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"/>
							</label>
							<p class="validator-hint hidden">
								Must be more than 8 characters, including
								<br/>At least one number
								<br/>At least one lowercase letter
								<br/>At least one uppercase letter
							</p>
						</fieldset>


						<!-- Login btn -->
						<div class="form-control mt-6">
							<button type="submit" class="btn btn-primary" @click.prevent="register">Créer un compte</button>
						</div>
					</form>

					<div class="text-center mt-4">
						<p>Déjà un compte ?
							<router-link :to="{name:'login'}" class="link link-primary">Se connecter</router-link>
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
			registerForm: {
				username: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions(['registerNewUser']),
		register() {
			this.registerNewUser(this.registerForm)
		}
	},
	watch: {
		user(newUser) {
			if (newUser) {
				this.$router.push({name: 'secured'})
			}
		}
	}
}
</script>

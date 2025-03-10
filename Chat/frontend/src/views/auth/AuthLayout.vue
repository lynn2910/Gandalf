<template>
	<router-view name="auth_body"></router-view>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: "AuthLayout",
	computed: {
		...mapState(['user'])
	},
	async beforeMount() {
		if (this.user) {
			await this.$router.push({name: 'secured'})
		}
	}
}
</script>

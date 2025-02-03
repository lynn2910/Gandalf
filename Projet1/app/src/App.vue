<template>
	<div id="app">
		<nav>
			<router-link to="/">Home</router-link>
			|
			<router-link to="/about">About</router-link>
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
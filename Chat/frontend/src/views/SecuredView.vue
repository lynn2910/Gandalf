<template>
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col w-full max-w-4xl">
			<h1 class="text-3xl font-bold text-primary mb-4">Chat en temps réel</h1>

			<div ref="chatContainer"
					 class="bg-base-100 rounded-box shadow-xl h-[600px] overflow-y-auto w-full mb-4 p-4">

				<div v-for="(message, index) in messages" :key="index"
						 :class="message.username === user?.username ? 'chat-end' : 'chat-start'"
						 class="chat"
				>
					<div class="chat-header">
						<p class="font-bold">{{ message.username }}</p>
						<time class="text-xs opacity-50 chat-bubble-time">{{ timeAgo(message.timestamp) }}</time>
					</div>
					<div class="chat-bubble">
						{{ message.content }}
					</div>
				</div>

				<div class="h-1" ref="chatBottom"></div>
			</div>

			<div class="join w-full">
				<input type="text" placeholder="Votre message..." class="input input-bordered join-item w-full"
							 v-model="newMessage" @keyup.enter="sendMessage"/>
				<button class="btn btn-primary join-item" @click="sendMessage">Envoyer</button>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from "vuex";

const wait = (ms) => new Promise(r => setTimeout(r, ms));

export default {
	name: "SecuredView.vue",
	computed: {
		...mapState(['user', 'messages']),
	},
	data() {
		return {
			newMessage: '',
			initialScrollDown: false,
			updateInterval: null,
		}
	},
	methods: {
		...mapActions(['getMessages', 'addMessage']),
		sendMessage() {
			if (this.newMessage.trim() !== '') {
				const message = {
					username: this.user?.username || 'Vous',
					content: this.newMessage.trim(),
					timestamp: new Date().toISOString()
				};
				this.addMessage(message);
				this.newMessage = '';
			}
		},
		scrollToBottom() {
			let chatBottom = this.$refs.chatBottom;

			if (chatBottom) {
				chatBottom.scrollIntoView({behavior: 'smooth'});
			}
		},
		waitForScroll() {
			return new Promise(resolve => {
				let chatContainer = this.$refs.chatContainer;

				if (chatContainer && chatContainer.scrollHeight > 0) {
					this.scrollToBottom();
					resolve();
				}
			});
		},
		timeAgo(timestamp) {
			const now = new Date();
			const messageTime = new Date(timestamp);
			const diffInSeconds = Math.round((now - messageTime) / 1000);

			if (diffInSeconds < 10) {
				return "il y a quelques secondes";
			} else if (diffInSeconds < 60) {
				return `Il y a ${diffInSeconds} secondes`
			} else if (diffInSeconds < 3600) {
				const minutes = Math.floor(diffInSeconds / 60);
				return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
			} else if (diffInSeconds < 86400) {
				const hours = Math.floor(diffInSeconds / 3600);
				return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
			} else if (diffInSeconds < 604800) {
				const days = Math.floor(diffInSeconds / 86400);
				return `il y a ${days} jour${days > 1 ? 's' : ''}`;
			} else if (diffInSeconds < 2592000) {
				const weeks = Math.floor(diffInSeconds / 604800);
				return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
			} else if (diffInSeconds < 31536000) {
				const months = Math.floor(diffInSeconds / 2592000);
				return `il y a ${months} mois`;
			} else {
				const years = Math.floor(diffInSeconds / 31536000);
				return `il y a ${years} an${years > 1 ? 's' : ''}`;
			}
		},
		updateTimestamps() {
			return this.messages;
		}
	},
	watch: {
		messages() {
			this.scrollToBottom();
		},
	},
	mounted() {
		this.waitForScroll();
		// Update timestamps every minute
		this.updateInterval = setInterval(this.updateTimestamps, 1000);
	},
	beforeUnmount() {
		clearInterval(this.updateInterval); // Clear interval when component is unmounted
	},
	async beforeMount() {
		if (!this.user) {
			await this.$router.push({name: 'login'});
			return;
		}
		await this.getMessages();
	},
};
</script>
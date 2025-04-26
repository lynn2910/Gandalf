<template>
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col w-full max-w-4xl">
			<div class="flex justify-between items-center w-full mb-4">
				<h1 class="text-3xl font-bold text-primary">Chat en temps réel</h1>
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn btn-primary">Nouvelle conversation</label>
					<ul tabindex="0"
							class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-60 overflow-y-auto">
						<li v-for="otherUser in availableUsers" :key="otherUser._id">
							<a @click="createNewChat([otherUser._id])">{{ otherUser.displayName || otherUser.email || 'Utilisateur sans nom' }}</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="flex w-full gap-4">
				<!-- Chat list -->
				<div class="w-1/4 bg-base-100 rounded-box shadow-xl p-2 overflow-y-auto h-[500px]">
					<div v-for="chat in chats" :key="chat._id"
							 @click="selectChat(chat._id)"
							 class="p-2 hover:bg-base-200 cursor-pointer rounded-lg mb-2"
							 :class="{'bg-base-200': currentChat && currentChat._id === chat._id}">
						<div class="font-bold">
							{{ getChatName(chat) }}
						</div>
						<div class="text-sm opacity-70" v-if="chat.messages && chat.messages.length > 0">
							{{ chat.messages[chat.messages.length - 1].content.substring(0, 20) }}...
						</div>
						<div class="text-sm opacity-70" v-else>
							Pas de messages
						</div>
					</div>
				</div>

				<!-- Chat messages -->
				<div class="w-3/4">
					<div ref="chatContainer"
							 class="bg-base-100 rounded-box shadow-xl h-[400px] overflow-y-auto w-full mb-4 p-4">

						<div v-if="!currentChat" class="flex items-center justify-center h-full">
							<p class="text-lg opacity-50">Sélectionnez une conversation ou créez-en une nouvelle</p>
						</div>

						<template v-else>
							<div v-for="(message, index) in currentChat.messages" :key="index"
									 :class="isCurrentUserMessage(message) ? 'chat-end' : 'chat-start'"
									 class="chat"
							>
								<div class="chat-header">
									<p class="font-bold">{{ getMessageSenderName(message) }}</p>
									<time class="text-xs opacity-50 chat-bubble-time">{{ timeAgo(message.timestamp) }}</time>
								</div>
								<div class="chat-bubble">
									{{ message.content }}
								</div>
							</div>
						</template>

						<div class="h-1" ref="chatBottom"></div>
					</div>

					<div class="join w-full">
						<input type="text" placeholder="Votre message..." class="input input-bordered join-item w-full"
									 v-model="newMessage" @keyup.enter="sendMessageInternal" :disabled="!currentChat"/>
						<button class="btn btn-primary join-item" @click="sendMessageInternal" :disabled="!currentChat">Envoyer
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import SocketService from "@/services/socket.service";

export default {
	name: "SecuredView",
	computed: {
		...mapState(['user', 'chats', 'currentChat', 'users']),
		availableUsers() {
			if (!this.user || !this.users) return [];
			return this.users.filter(u => u._id !== this.user._id);
		}
	},
	data() {
		return {
			newMessage: '',
			updateInterval: null,
		}
	},
	methods: {
		...mapActions([
			'fetchUser',
			'fetchChats',
			'fetchChat',
			'createChat',
			'sendMessage',
			'fetchUsers'
		]),
		async selectChat(chatId) {
			await this.fetchChat(chatId);
			this.scrollToBottom();
		},
		async createNewChat(participantIds) {
			const chat = await this.createChat(participantIds);
			if (chat) {
				await this.selectChat(chat._id);
			}
		},
		async sendMessageInternal() {
			if (this.newMessage.trim() !== '' && this.currentChat) {
				const content = this.newMessage.trim();
				this.newMessage = '';
				await this.sendMessage({
					chatId: this.currentChat._id,
					content: content
				});
			}
		},
		scrollToBottom() {
			this.$nextTick(() => {
				let chatBottom = this.$refs.chatBottom;
				if (chatBottom) {
					chatBottom.scrollIntoView({behavior: 'smooth'});
				}
			});
		},
		isCurrentUserMessage(message) {
			return message.sender && this.user && message.sender._id === this.user._id;
		},
		getMessageSenderName(message) {
			if (message.sender) {
				return message.sender.displayName || message.sender.email || 'Utilisateur sans nom';
			}
			return 'Inconnu';
		},
		getChatName(chat) {
			if (!chat.participants || chat.participants.length === 0) return 'Chat';

			// Filter out current user
			const otherParticipants = chat.participants.filter(p => p._id !== this.user._id);

			if (otherParticipants.length === 0) {
				return 'Notes personnelles';
			} else if (otherParticipants.length === 1) {
				const participant = otherParticipants[0];
				return participant.displayName || participant.email || 'Utilisateur sans nom';
			} else {
				return `Groupe (${otherParticipants.length + 1})`;
			}
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
			// Force re-render to update timestamps
			this.$forceUpdate();
		}
	},
	watch: {
		currentChat() {
			this.scrollToBottom();
		},
	},
	async mounted() {
		// Connect to socket
		SocketService.connect();

		// Update timestamps every minute
		this.updateInterval = setInterval(this.updateTimestamps, 60000);

		// Fetch initial data
		await this.fetchUsers();
		await this.fetchChats();

		// Select first chat if available
		if (this.chats.length > 0) {
			await this.selectChat(this.chats[0]._id);
		}
	},
	beforeUnmount() {
		clearInterval(this.updateInterval);
		SocketService.disconnect();
	},
	async beforeMount() {
		if (!this.user) {
			await this.fetchUser();
			if (!this.user) {
				await this.$router.push({name: 'login'});
			}
		}
	},
};
</script>

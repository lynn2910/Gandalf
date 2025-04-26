import { Request } from "@/services/axios.service";

async function getChats() {
  return await Request.get("/api/chats").send();
}

async function getChat(chatId) {
  return await Request.get(`/api/chat/${chatId}`).send();
}

async function createChat(participantIds) {
  return await Request.post("/api/chat")
    .body({ participantIds })
    .send();
}

async function sendMessage(chatId, content) {
  return await Request.post(`/api/chat/${chatId}/message`)
    .body({ content })
    .send();
}

async function getUsers() {
  return await Request.get("/api/users").send();
}

export default { getChats, getChat, createChat, sendMessage, getUsers };
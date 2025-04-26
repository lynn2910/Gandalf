import {Request} from "@/services/axios.service";

async function login(email, password) {
    return await Request.post("/auth/login")
        .body({email, password})
        .send()
}

async function register(username, email, password) {
    return await Request.post("/auth/register")
        .body({username, email, password})
        .send()
}

async function getUser() {
    return await Request.get("/api/current_user").send();
}

async function logout() {
    return await Request.get("/auth/logout").send();
}

export default {login, register, getUser, logout};

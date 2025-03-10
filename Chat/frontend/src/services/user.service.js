import {Request} from "@/services/axios.service";

async function login(email, password) {
    // TODO
    return await Request.post("/login")
        .body({email, password})
        .send()
}

async function register(username, email, password) {
    // TODO
    return await Request.post("/register")
        .body({username, email, password})
        .send()
}

async function getUser() {
    // TODO
    return await Request.get("/user").send();
}

async function logout() {
    // TODO
    return await Request.get("/logout").send();
}

export default {login, register, getUser, logout};
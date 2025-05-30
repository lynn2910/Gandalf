const axios = require('axios');
let BASE_URL = "http://localhost:5000";

const axios_client = axios.create({baseURL: BASE_URL});

export const Method = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE",
    Patch: "PATCH",
}

export class Request {
    constructor(method, route) {
        this.method = method;
        this.url = route;
    }

    static get = (route) => new Request(Method.Get, route);
    static post = (route) => new Request(Method.Post, route);
    static put = (route) => new Request(Method.Put, route);
    static delete = (route) => new Request(Method.Delete, route);
    static patch = (route) => new Request(Method.Patch, route);

    args(route_args) {
        Object.entries(route_args)
            .forEach(([key, value]) => {
                this.url = this.url.replace(`:${key}`, value);
            })

        return this;
    }

    body(body) {
        this.body = body;
        return this;
    }

    send() {
        return new Promise((resolve, reject) => {
            let call = null;
            switch (this.method) {
                case Method.Get: {
                    call = axios_client.get(this.url, {withCredentials: true});
                    break;
                }
                case Method.Post: {
                    call = axios_client.post(this.url, this.body, {withCredentials: true});
                    break;
                }
                case Method.Put: {
                    call = axios_client.put(this.url, this.body, {withCredentials: true});
                    break;
                }
                case Method.Delete: {
                    call = axios_client.delete(this.url, {withCredentials: true});
                    break;
                }
                case Method.Patch: {
                    call = axios_client.patch(this.url, this.body, {withCredentials: true});
                    break;
                }
                default: {
                    throw new Error("Unknown method " + this.method);
                }
            }
            if (!call) return reject(new Error(`Unknown method ${this.method}`));
            call.then(
                (res) => {
                    return resolve({error: 0, status: res.status, data: res.data})
                },
                (err) => {
                    console.error('API Error:', err);
                    return resolve({
                        error: 1,
                        status: err.response?.status || 500,
                        data: err.response?.data || err.message
                    })
                },
            );
        })
    }
}

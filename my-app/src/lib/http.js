
export const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jaka-backend.camps.fahrul.id"

function http(url, body ,opts={}){
    const headers = {}
    if(opts.token){
        headers.Authorization = "Bearer "+opts.token
    }
    return fetch(BASE_URL + url, {
        method: opts.method || "GET",
        body,
        headers
    })
}

export default http;
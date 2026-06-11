export const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jaka-backend.camps.fahrul.id"

function http(url, body, opts = {}) {
  const headers = {}
  
  if (opts.token) {
    headers.Authorization = "Bearer " + opts.token
  }
  
  const config = {
    method: opts.method || "GET",
    headers
  }
  
  // Only add body and Content-Type for POST/PUT/PATCH requests
  if (body && (opts.method === "POST" || opts.method === "PUT" || opts.method === "PATCH")) {
    if (body instanceof FormData) {
      config.body = body;
      // Do not set Content-Type header for FormData; the browser will set it with the boundary
    } else {
      config.body = typeof body === "string" ? body : JSON.stringify(body)
      headers["Content-Type"] = "application/json"
    }
  }
  
  return fetch(BASE_URL + url, config)
}

export default http
export function fetchApi(address: string, method: string, body = null) {
    return fetch("http://localhost:3002" + address, {
        method: method,
        body: body
    })
}

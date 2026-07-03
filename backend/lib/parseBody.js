export function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', chunck => body += chunck)
        req.on('end', () => resolve(JSON.parse(body)))
        req.on('error', reject)
    }) 
}
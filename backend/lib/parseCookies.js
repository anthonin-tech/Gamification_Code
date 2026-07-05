export function parseCookies(req) {
    const raw = req.headers.cookie ?? ''
    return Object.fromEntries(
        raw.split('; ').filter(Boolean).map(c => {
            const i = c.indexOf('=')
            return [c.slice(0, i), c.slice(i + 1)]
        })
    )
}
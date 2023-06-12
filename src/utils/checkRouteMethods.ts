
export const checkRouteMethods = (req) => {
    const model = (req.route.path).split('/')[1]
    const method = Object.keys(req.route.methods)
    return {model, method: method[0]}
}

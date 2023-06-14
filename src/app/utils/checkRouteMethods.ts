
export const checkRouteMethods = (req) => {
    // const model = (req.route.path).split('/')[1]
    const model = req.route.path
    const method: string[] = Object.keys(req.route.methods)
    return {model, method: method[0]}
}

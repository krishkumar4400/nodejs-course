


async function authenticationMiddleware(req,res) {
    try {
        const tokenHeader = req.headers;
        if(!tokenHeader) {
            return next();
        }
    } catch (error) {
        console.error(error);
        return next();
    }
}
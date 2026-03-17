


export async function authenticationMiddleware(req,res) {
    try {
        const tokenHeader = req.headers;
        if(!tokenHeader) {
            return next();
        }

        const payload = jwt.verify(tokenHeader, process.env.JWT_SECRET);

        req.userId = payload.userId;
        next();
    } catch (error) {
        console.error(error);
        return next();
    }
}

export async function isAuthenticated(req,res,next) {
    if(!req.userId) {
        return res.status(403).json({
            message: "You are not logged in",
            success: false 
        });
    }

    next();
}
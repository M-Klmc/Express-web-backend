export function requestToContext(req, res, next) {
    res.locals.req = req;
    next();
}

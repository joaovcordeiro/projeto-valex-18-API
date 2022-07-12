var serviceErrorToStatusCode = {
    unauthorized: 401,
    conflict: 409
};
export function unauthorizedError() {
    return { type: "unauthorized" };
}
export function conflictError() {
    return { type: "conflict" };
}
export function notFoundError() {
    return { type: "notFound" };
}
export function badRequestError() {
    return { type: "badRequest" };
}
export default function handleErrorsMiddleware(err, req, res, next) {
    if (err.type) {
        res.sendStatus(serviceErrorToStatusCode[err.type]);
    }
    res.sendStatus(500);
}

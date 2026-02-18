export function errorRes(res, error){
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Invalid server error';
    return res.status(statusCode).json({
        statusCode,
        message
    })
}
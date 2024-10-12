const NotFound = (req, res, next) => {

    const error = new Error(`Not Found - ${req.originalUrl}`);

    res.status(404);
    next();
}

const ErrorHandler = (error, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.status

    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack 
    })
} 

module.exports = {
    NotFound,
    ErrorHandler
}
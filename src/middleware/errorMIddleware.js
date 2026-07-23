//An error middleware has 4 parameters, not 3.
//Express recognizes it as an error-handling middleware because it has four parameters.
// export const errorHandler = (error, req, res, next) => {
//     return res.status(500).json({
//         message: error.message
//     });
// }; //no matter what error was it always return same thing thats why improving it
export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
};
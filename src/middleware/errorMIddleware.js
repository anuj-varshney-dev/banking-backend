//An error middleware has 4 parameters, not 3.
//Express recognizes it as an error-handling middleware because it has four parameters.
export const errorHandler = (error, req, res, next) => {
    return res.status(500).json({
        message: error.message
    });
};
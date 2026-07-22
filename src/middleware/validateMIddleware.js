export const validate = (schema) => (req, res, next) => {  //schema is a parameter  and variable name which is validate should be same as in  
        const result = schema.safeParse(req.body); //We use safeParse() because it doesn't throw an exception if validation fails.
        if(!result.success)
        {
            return res.status(400).json({ // 400 is code for bad request
                errors: result.error.issues
            })
        }
        next(); //go to next middleware or controller 
};
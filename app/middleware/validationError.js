const {ValidationError} = require('sequelize')

const validateError = (err, req, res, next) => {
    
    if(err instanceof ValidationError){

        return res.status(422).send({
            error: err.message
        });
    } 
    next(err);

}


module.exports = validateError;



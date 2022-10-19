const Joi = require('joi');
const { number } = require('joi');

module.exports.goodaSchema = Joi.object({
    gooda: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        //image: Joi.string().required(),
        //location: Joi.string(),
        description: Joi.string()
    }).required(),
    deleteImages: Joi.array()
});   


/*module.exports.organizationSchema = Joi.object({
    organization: Joi.object({
        title: Joi.string(),
        price: Joi.number().min(0),
        //image: Joi.string().required(),
        //location: Joi.string(),
        description: Joi.string()
    }).required(),
    deleteImages: Joi.array()
});*/

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

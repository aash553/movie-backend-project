const Joi = require('joi')
const mongoose = require('mongoose')
const {genreSchema} = require('./genre')

const movieSchema = mongoose.Schema({
    title : {
       type : String,
       required : true,
       trim : true,
       minlength : 5,
       maxlength : 255,
    },
    genre :{
        type : genreSchema,
        required : true,
    },
    numberInStock : {
        type : Number,
        required: true,
    },
    dailyRentals : {
        type : Number,
        required : true,
        min : 0,
        max : 255,
    },
})

function validateMovie(movie){
    const schema = {
        title : Joi.string().min(5).max(255).required(),
        genreId : Joi.obejectId().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentals : Joi.number().min(0).required(),
    };
    return Joi.validate(movie,schema);
}

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.validateMovie = validateMovie;
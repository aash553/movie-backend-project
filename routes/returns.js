const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const moment = require('moment');
const validate = require('../middleware/validate')
const express = require('express');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const router = express.Router();

function validateReturnData(reqBody) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(reqBody);
}

router.post('/', [auth, validate(validateReturnData)], async(req, res) => {
    // rest of your code stays the same
    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    if (!rental) return res.status(404).send('rental not found');
    if (rental.dateReturned) return res.status(400).send('returned already');

    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentals;
    await rental.save();

    await Movie.updateOne({_id: rental.movie._id}, {
        $inc: {numberInStock: 1}
    });

    return res.status(200).send(rental);
});

module.exports = router;
const moment = require('moment')
const request = require('supertest')
const {Rental} = require('../../models/rental')
const {Movie} = require('../../models/movie')
const {User} = require('../../models/user')
const mongoose = require('mongoose')

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let movie;
    let token;

    const exec = ()=>{
     return request(server)
    .post('/api/returns')
    .set('x-auth-token',token)
    .send({ movieId : movieId , customerId : customerId})
    }

    beforeAll(async () => { 
        server = require('../../index');
        while (mongoose.connection.readyState !== 1) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    });

    beforeEach(async () => {
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        movie = new Movie({
            _id: movieId,
            title : '12345',
            dailyRentals : 150,
            genre : {name : 'action'},
            numberInStock : 10 
        })
        await movie.save()
        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentals: 150 
            }
        });
        await rental.save();
    });

    afterEach(async () => {
        await Rental.deleteMany({});
    });

    afterAll(async () => {
        await server.close();
        await mongoose.disconnect();
    });
    
   it('should return 401 if the client is not logged in ' , async()=>{
    token ='';
   const res = await exec();
    expect(res.status).toBe(401);
   })

   it('should return 400 if customerId is not provided ' , async()=>{
    customerId ='';
    const res = await exec();
    expect(res.status).toBe(400);
   });

   it('should return 400 if movieId is not provided ' , async()=>{
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
   });

   it('should return 404 if not rental found for  customerId/ movieId  ' , async()=>{
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
   });

    it('should return 400 if return is already processed' , async()=>{
    rental.dateReturned = new Date()
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
   });

    it('should return 200 if it as valid request' , async()=>{
    
    const res = await exec();
    expect(res.status).toBe(200);
   });

   it('should set the return date if input is valid ' , async()=>{
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
   const diff =  new Date() - rentalInDb.dateReturned
    expect(diff).toBeLessThan(10*1000);
   });

   it('should set the returnfee if input is valid ' , async()=>{

    rental.dateOut = moment().add(-7,'days').toDate();
    await rental.save()
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBeDefined();
   });

   it('should increase the movie stock if input is valid ' , async()=>{

    const res = await exec();
    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
   });


   it('should return  rental  if input is valid ' , async()=>{


    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id)
   expect(res.body).toHaveProperty('dateOut');
    expect(res.body).toHaveProperty('dateReturned');
    expect(res.body).toHaveProperty('rentalFee');
    expect(res.body).toHaveProperty('customer');
    expect(res.body).toHaveProperty('movie');
   });
});
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const genre = [
    
        {id:1 , name : "Horror"},
        {id:2 , name : "comedy"},
        {id:3 , name : "thriller-suspense"},
        {id:4 , name : "Romantic"}
    
]


app.get('/',(req,res)=>{
    res.send("this is my first ever server ");
})

//this is for getting all the genre
app.get('/api/genre',(req,res)=>{
    res.send(genre);
})

//this is for getting the genre by id
app.get('/api/genre/:id',(req,res)=>{
    const type = genre.find(c=>c.id === parseInt(req.params.id));
    if(!type) return res.status(404).send('This is an invalid type');
    res.send(type);
})

//this is to add a new request
app.post('/api/genre',(req,res)=>{

    //always remember to use joi schema is required
    //we always need to validate the input
    const schema = {
        name: Joi.string().min(3).required()
    };
    const {error} = validateType(req.body);
    if(error){
        res.status(404).send(error.details[0].message)
    }
    const type= 
        {
            id : genre.length+1,
            name : req.body.name
        };
        genre.push(type);
        res.send(type);
})


//to update (put)

app.put('/api/genre/:id',(req,res)=>{

    //check if the id is valid 
    const type = genre.find(c=>c.id === parseInt(req.params.id));
    if(!type) return res.status(404).send('This is an invalid type');


    //validation 
    const {error} = validateType(req.body);
    if(error){
        res.status(404).send(error.details[0].message)
    }
    //update type
    type.name = req.body.name;
    res.send(type)

})

//## to delete

app.delete('/api/genre/:id',(req,res)=>{
    const type = genre.find(c=>c.id === parseInt(req.params.id));
    if(!type) return res.status(404).send('This is an invalid type');

    const index = genre.indexOf(type);
    genre.splice(index,1);

    res.send(type);
})


// we are creating a validation function so that we dont have to cpy it

function validateType(type){
        const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(type,schema);
}




const port = process.env.PORT || 3000;
app.listen(port ,()=>console.log(`Server is running on port ${port}`));
const {Customer,validate} = require('../models/customer')
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();


router.get('/',async(req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.post('/',async(req,res)=>{
    const {error} =  validate(req.body)
    if(error){
        res.status(404).send(error.details[0].message)
    }
    const customers = new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })
    await customers.save();
    res.send(customers)
})

router.put('/',async(req,res)=>{
    //validate

    const {error} = validate(req.body)
    if(error){
        res.status(404).send(error.details[0].message)
    }
    const customer = await Customer.findByIdAndUpdate(req.params,id,{
        name:true
    })
    if(!customer) return res.status(404).send('This is an invalid type');
    res.send(customer);
})

router.delete('/:id',async(req,res)=>{
    const customer = await Customer.findByIdAndDelete(req.params.name)
    if(!customer) return res.status(404).send('This is an invalid customer')
})

router.get('/:id',async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('This is an invalid customer ')
})

module.exports = router;
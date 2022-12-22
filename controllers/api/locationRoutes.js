const router = require('express').Router();

const Location = require('../../models/location');

router.post('/', async (req,res) => {
    try{
        const locationData = await Location.create({

        });
        res.status(200).json(locationData)
    } catch (err){
        res.status(400).json(err)
    }
})


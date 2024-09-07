const express = require('express');
const router = express.Router();

const MenuItem = require('../models/menu');

router.post('/', async (req,res)=>{
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'})
    }
});

router.get('/', async(req, res)=>{
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error : 'Internal Server Error'})
    }
});

router.get('/:tasteType',async (req, res)=>{
    try {
        const tasteType = req.params.tasteType;

        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const data = await MenuItem.find({taste : tasteType});
            console.log('data fetched');
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    } catch (error) {
        res.status(500).json({error : 'Internal Server Error'});
    }
});


module.exports = router;

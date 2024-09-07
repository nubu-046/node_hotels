const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

router.post('/',async (req, res) => {

    try {
        const data = req.body; //assuming that the request body contains the person data

        //create a new person document using mongoose model
        const newPerson = new Person(data);

        //save the new person document in db
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
       
    //Steps :
    //const data = req.body; //assuming that the request body contains the person data

    //create a new person document using mongoose model
    // const newPerson = new Person();
    // newPerson.name = data.name;
    // newPerson.age = data.age; Lengthy process

    //therefore, save the new person to the database
    // newPerson.save((error, savedPerson)=>{ 
    //     if(error){
    //         console.log('Error occured : ', error);
    //         res.status(500).json({error:'Internal server error'})
    //     }
    //     else{
    //         console.log('Data saved');
    //         res.status(200).json(savedPerson);
    //     }
    // }) this method (callback) is now depreciated and noone uses it anymore
    //therefore, save the new person to the database using async await shown above

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.get('/', async(req, res)=>{
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error : 'Internal Server Error'})
    }
});

//Parameterised API call
router.get('/:workType',async (req, res)=>{
    try {
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const data = await Person.find({work : workType});
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

router.put('/:id',async (req,res)=>{
    try {
        //extract person id from the url
        const personId  = req.params.id;

        //update data for the person;
        const updateData = req.body;

        const updatePerson = await Person.findByIdAndUpdate(personId, updateData,{
            new : true, //returns updated document in updatePeron / response
            runValidators : true // Run Mongoose validation
        });

        if(!updatePerson){
            return res.status(404).json({error : 'Person not found'});
        }
        res.send(200).json(updatePerson);
    } catch (error) {
        res.status(500).json({error : 'Internal Server Error'});
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const personId  = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(personId);

        if(!deletedPerson){
            return res.status(404).json({error : 'Person not found'});
        }
        res.send(200).json(deletedPerson);
        console.log('person deleted');

    } catch (error) {
        res.status(500).json({error : 'Internal Server Error'});
    }
});

module.exports = router;
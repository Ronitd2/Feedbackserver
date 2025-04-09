const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Feedbacks = require('../model/feedbackSchema');

router.post('/submit',async(req,res)=>{
    if(!req.body.title || !req.body.description || !req.body.name ){
        console.log('Missing property')
        return res.json({error: 'invalid credentials'});
    }
    try{
    console.log(req.body);
    const feedback = new Feedbacks(req.body);
        await feedback.save();
    res.json({ success: 'OK'});
    }catch(e)
    {
        console.log(e);
        res.json({error:e});
    }
    });

router.post('/query',async(req,res)=>{
    try {
        const feedbacks = await Feedbacks.find({}, { title: 1, description: 1, _id: 1 });
        res.json({ feedbacks });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
});
module.exports = router;
// .select('title description')
const express = require('express')
const loginRouter = express.Router();
const User = require('../model/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'DUMBARSE';

loginRouter.post('/',async (req,res)=>{
    try{
        if(!req.body.email || !req.body.password){
            return res.json({error: 'invalid credentials'});
        }
        const user = await User.findOne({email:req.body.email});
        if(user == [] || !user){
            return res.json({error: 'invalid credentials'});
        }
        const passwordCompare = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordCompare){
            return res.json({error: 'invalid credentials'});
        }
        const token = await jwt.sign({ data:{email: req.body.email}}, SECRET);
       
        res.json({success: 'OK', token})
    }
    catch(err){
        return res.json({error: 'invalid credentials'});
    }
})

module.exports = loginRouter
const User = require("../model/UserSchema");
const express= require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'DUMBARSE';

router.post('/', async (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.name ){
        console.log('Missing property')
        return res.json({error: 'invalid credentials'});
    }
    try {
        console.log(req.body);
        const checkUser = await User.findOne({email:req.body.email});
        if(checkUser){
            console.log("Enter",checkUser)
            return res.json({error: 'user with this email already exists'});
        }
        else{
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const user = new User(req.body);
        await user.save();
        console.log(req.body.email);
        const token = await jwt.sign({ data:{email: req.body.email}}, SECRET);
        
        console.log("Successfull complete");
        res.json({ success: 'OK',token });
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports=router;
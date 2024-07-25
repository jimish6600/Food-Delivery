import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
//login user
const loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({
            success:true,
            token
        })
    }catch(error){
        res.status(400).json({
            message: error.message || error,
            success: false
        });
    }     
}

//register user
const registerUser = async(req,res) =>{
    const {name,password,email} = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({
                success:false,
                message : "User already exists"
            })
        }

        // validating email format & strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Please enter valid email"})
        }

        if(password.length<8){
            return res.json({success:false , message:"Password must be at least 8 characters long"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})

    }catch(error){
        res.status(400).json({
            message: error.message || error,
            success: false
        });
    }
}

export {loginUser,registerUser}
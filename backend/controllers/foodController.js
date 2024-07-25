import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async(req,res) =>{
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })

    console.log("jimish")

    try {
        await food.save();
        res.json({
            message: "Food Added",
            success: true
        });
    }catch (error) {
        res.status(400).json({
            message: err.message || err,
            success: false
        });
    }
}

const listFood = async(req,res) =>{
    try{
        const foods = await foodModel.find({});
        res.json({
            message: foods,
            success: true
        });
    }catch(error){
        res.status(400).json({
            message: err.message || err,
            success: false
        });
    }
}

const removeFood = async(req,res) => {
    try{
        const foods = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foods.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            message: "Food Removed",
            success: true
        });
    }catch(error){
        res.status(400).json({
            message: err.message || err,
            success: false
        });
    }
}

export {addFood,listFood,removeFood};
export default listFood;
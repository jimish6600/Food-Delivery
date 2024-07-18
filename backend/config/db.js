import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://jimishpately50:kfSN4mtURO3utkV7@cluster0.symjzqu.mongodb.net/food_De').then(()=>console.log("DB connected"));
}
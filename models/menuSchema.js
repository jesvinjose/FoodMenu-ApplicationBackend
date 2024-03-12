import mongoose from "mongoose";

const menuSchema=mongoose.Schema({
    category: {
        type: String,
        enum: ["Indian", "Chineese", "Thai", "Arabian", "Shakes & IceCreams"],
    },
    item:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },   
},{timeStamp:true})

export const Menu = mongoose.model('Menu', menuSchema);
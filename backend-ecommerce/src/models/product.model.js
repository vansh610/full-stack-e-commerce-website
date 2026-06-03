import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },
    image:{
        type: String
    }
    },{
        timestamps:true
    })

    export const Product = mongoose.model("Product",productSchema)
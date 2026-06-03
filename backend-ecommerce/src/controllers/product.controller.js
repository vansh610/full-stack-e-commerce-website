import { Product } from "../models/product.model.js";

const addProduct = async (req, res) => {

    try {

        const {
            title,
            description,
            price,
            stock,
            category,
            image
        } = req.body;

        const product = await Product.create({

            title,
            description,
            price,
            stock,
            category,
            image

        });

        res.status(201).json({

            message: "Product added successfully",
            product

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
};

const getAllProducts = async (req, res) => {

    try {

        const { category, keyword } = req.query

        let filter = {}

        if (category) {
            filter.category = category
        }

        if (keyword) {
            filter.title = {
                $regex: keyword,
                $options: "i"
            }
        }

        const products = await Product.find(filter)

        res.status(200).json({
            total: products.length,
            products
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })
    }
}

const getSingleProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const product= await Product.findById(id)
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const updateProduct = async (req, res) => {

    try {

        const { id } = req.params

        const updatedProduct = await Product.findByIdAndUpdate(

            id,

            req.body,

            {
                new: true
            }
        )

        if (!updatedProduct) {

            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            message:"Product deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

export {addProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct}
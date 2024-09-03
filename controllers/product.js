const {productCreate,allProduts}=require('../service/productService')
const db=require('../models/modelProduct')

exports.postProduct=async(req,res,next)=>{

    try{
        const {name,description,price}=req.body;//pass the arg as table field names
        const productData=await productCreate(name,description,price); //here also
        console.log(productData,'productdata')
        console.log('data incoming ',req.body)
        // console.log('hai')
        res.send(productData)
    }
    catch(err){
        console.log(err)
        throw err
    }
}

exports.getProduct=async(req,res,next)=>{

    try{
        const products=await allProduts();
        console.log('hai i am get products')
        // res.send('helo')
        res.send(products)
    }
    catch(err){
        console.log(err)
        throw err
    }
    
}


const {cartCreate,AllCart,addToCart, getUserCart,deleteCartProd}=require('../service/cartService')
const db=require('../models/cart')

exports.postCart=async(req,res,next)=>{

    console.log('hai i am from cart controller')
    // res.send('hai i am from controller')
    try{
        const {product_id,user_id,quantity}=req.body
        const cartdata=await cartCreate(product_id,user_id,quantity)
        res.send(cartdata)
    }catch(err){
        console.log('error in controller',err)
        throw err
    }    
}

exports.getCart=async(req,res,next)=>{
    console.log('hai i am get Cart')
    try{
        // console.log(req.body);
        const getAllCart=await AllCart()
        // res.send('this from cart contoller page')
        res.send(getAllCart)
        // return getAllCart
    }catch(err){
        console.log(err)
        throw err
    }
}

exports.postAddcart=async(req,res,next)=>{
    
    try{
        const user_id=req.body.user_id
        const product_id=req.body.product_id
        const quantity=req.body.quantity
        const type=req.body.type
        // console.log(quantity)
        
        console.log('Got from UI')
        const addCart=await addToCart(user_id,product_id,quantity,type)
        console.log(addCart)
        res.send(addCart)  
    }
    catch(err){
        console.log('error in controller',err)
        throw err
    }
    
}

exports.getCartByUserId=async(req,res,next)=>{
    // const UserID=req.body.user_id
    const UserId=req.params.userID
    // console.log(UserId)

    try {
        console.log('---GET USER DEATILS--')
        const getCartbyUser=await getUserCart(UserId)
        // console.log(getCartbyUser)
        res.send(getCartbyUser)
        
    } catch (err) {
        console.log('error in controller',err)
        throw err
    }    
}

exports.patchCartById=async(req,res,next)=>{
    const productID=req.query.product_id
    // console.log(productQuery)
    try {
        // console.log("hai")
        const deleteCartByProd=await deleteCartProd(productID)
        console.log(deleteCartByProd)
        res.send("product deleted")
    } 
    catch (err) {
        console.log("---ERROR IN CONTROLLER---",err)
        throw err
    }
    
}
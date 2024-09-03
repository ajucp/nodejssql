const Cart=require('../models/cart');
const Product = require('../models/modelProduct');
const User=require('../models/user')

const cartCreate=async(product_id,user_id,quantity)=>{
    console.log('hai i am service')
    const createCartser=await Cart.saveCarts(product_id,user_id,quantity);
    // console.log(createCartser);
    return createCartser
}
// const updatecart=async(product_id,user_id,quantity)=>{
//     const updatecartItem=await Cart.saveCarts(product_id,user_id,quantity)
//     console.log(updatecartItem)
//     return updatecartItem
// }
const AllCart=async()=>{
    console.log('cart from service page')
    const cartDetails=await Cart.getCart();
    return cartDetails
}
const addToCart=async (user_id,product_id,quantity,type)=>{
    try{
        const existingCartItem=await Cart.getCartById(user_id,product_id); //{...}
        // console.log('add cart of service page',existingCartItem[0];
        console.log(existingCartItem,'existing');
       

        if(existingCartItem.length > 0){
            console.log("---UPDATING---")

            let newQunatity=existingCartItem[0].quantity;

            if(type =="add"){
                newQunatity =(newQunatity+quantity)
            }
            else if(type =="sub"){
                newQunatity=Math.max(0,newQunatity-quantity)
            }
            console.log('new quantity',newQunatity)
            const updateCartitem=await Cart.updateCartItem(user_id,product_id,newQunatity)
            // const updatedCartitem=await Cart.updateCartItem(user_id,product_id, existingCartItem[0].quantity+quantity)
            // console.log(updatedCartitem)
            // return updatedCartitem
            if (updateCartitem==true){
                return await Cart.getCartById(user_id,product_id); 
            }
            else{
                return {"message": "Operation failed"}//json message
            }
        }
        else{
            console.log("---INSERING---")
            if(type==='add'){
                const newCartitem=await Cart.saveCarts(product_id, user_id,quantity)
                if(newCartitem==true){
                    return await Cart.getCartById(user_id,product_id)
                }
                else{
                    return {"message": "Operation failed"}
                }
                
            }else{
                return {'message':'item not found in cart'}
            }
            console.log(updatedCartitem)
            return newCartitem
        }
        
    }
    catch(err){
        console.log('error in service',err)
        throw err
    }
    
}

const getUserCart=async(user_id)=>{// name
    try {
        const userDetails=await User.fetchUserDetails(user_id)
       
        console.log('userDetails:',userDetails[0].email)
       
        if(userDetails.length>0 && userDetails[0].email)
            {
            console.log('--FETCHING CART DETAILS--')
            const usercartDetails=await Cart.fetchCartDetails(user_id)
            const totalAmount=usercartDetails.reduce((total,cartItems)=>{
                return total+cartItems.totalPrice
            },0)
            console.log(totalAmount)
            // console.log(usercartDetails)
            const userDetailsById={email:userDetails[0].email,totalAmount:totalAmount,cartItems:usercartDetails}
            console.log(userDetailsById)
            return userDetailsById
        } else{
            const CartResponce={message:`fetched cart have no items or the email u have given is not founded`}
            return CartResponce//name
        }
        // return userDetails
    } 
    catch (err) {
        console.log('error in service',err)
        throw err
    }
    
}

const deleteCartProd=async(productID)=>{
    try {
        const productdetails=await Cart.deleteProductDetails(productID)
        return productdetails
    } catch (err) {
        console.log("---ERROR IN SERVICE PAGE---",err)
        throw err
    }
    
}


// module.exports=AllCart;
// module.exports=cartCreate;
// module.exports=addToCart;
// module.exports=UserCartProduct;
// module.exports=updatecart;
module.exports={
    AllCart,
    cartCreate,
    addToCart,
    getUserCart,
    deleteCartProd
}
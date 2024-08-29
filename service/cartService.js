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
    const cartDetails=await Cart.getAllCart();
    return cartDetails
}
const addToCart=async (user_id,product_id,quantity)=>{
    try{
        const existingCartItem=await Cart.getCart(user_id,product_id); //{...}
        // console.log('add cart of service page',existingCartItem[0];
        console.log(existingCartItem,'existing');
       

        if(existingCartItem.length > 0){
            console.log("---UPDATING---")
            const updatedCartitem=await Cart.updateCartItem(user_id,product_id, existingCartItem[0].quantity+quantity)
            // console.log(updatedCartitem)
            // return updatedCartitem
            if (updatedCartitem==true){
                return await Cart.getCart(user_id,product_id); 
            }
            else{
                return {"message": "Operation failed"}//json message
            }
        }
        else{
            console.log("---INSERING---")
            const newCartitem=await Cart.saveCarts(product_id, user_id,quantity)
            // console.log(updatedCartitem)
            // return newCartitem
            if(newCartitem==true){
                return await Cart.getCart(user_id,product_id)
            }
            else{
                return {"message": "Operation failed"}
            }
        }

    }
    catch(err){
        console.log('error in service',err)
    }
    
}

const UserCartProduct=async(user_id)=>{
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
            return usercartDetailsById
        } else{
            const userCartNotAdded={message:`fetched cart have no items or the email u have given is not founded`}
            return userCartNotAdded
        }
        // return userDetails
    } 
    catch (err) {
        console.log('error in service',err)
    }
    
}

const deleteCartProd=async(productID)=>{
    try {
        const productdetails=await Cart.deleteProductDetails(productID)
        return productdetails
    } catch (err) {
        console.log("---ERROR IN SERVICE PAGE---",err)
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
    UserCartProduct,
    deleteCartProd
}
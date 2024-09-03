const { json } = require('express');
const db=require('../util/database');

module.exports=class Cart{

    static saveCarts=async(product_id,user_id,quantity)=>{
        console.log('----SAVING NEW ITEM TO CART---')
        try{
            // const quantity = 1;
            const createcart=await db.execute('INSERT INTO cart (product_id,user_id,quantity) VALUES(?,?,?)',[product_id,user_id,quantity])
            console.log(createcart[0])
            // return createcart
            return true
        }catch(err){
            console.log(err)
            throw err
        }
        
    }
    static getCart=async()=>{
        console.log('all cart details')
        const getCartDet=await db.execute('SELECT * FROM cart')
        return getCartDet[0]
    }
    
    static getCartById=async(user_id,product_id)=>{
        try{
            const getCartItemsById=await db.execute('SELECT * FROM cart WHERE user_id=? AND product_id=?',[user_id,product_id])
            // console.log(getCartitem)
            // console.log(JSON.stringify(getCartitem))
            // console.log(typeof getCartitem)
            console.log('model of adding cart')
            
            return getCartItemsById[0]
        }
        catch(err){
            console.log('error in model',err)
            throw err
        }
        
    }
    static updateCartItem=async(user_id,product_id,quantity)=>{
        try {
            
            const upCartitem=await db.execute('UPDATE cart SET quantity=? WHERE user_id=? AND product_id=?',[quantity,user_id,product_id])
            // console.log(getCartitem)
            // console.log(JSON.stringify(getCartitem))
            // console.log(typeof upCartitem)
            // console.log('model of update cart')
            // return upCartitem
            return true
        } catch (err) {
            console.log('error in model',err)
            throw err
        }
    }

    static fetchCartDetails=async(user_id)=>{
        console.log('---CART DETALILS---')
        // const fetchCart=await db.execute('SELECT * FROM cart WHERE user_id=?',[user_id])
        const query=`SELECT 
                        c.id,
                        c.product_id,
                        p.name AS productName,
                        p.price AS productPrice,
                        c.quantity,
                        (p.price*c.quantity) AS totalPrice,
                        u.email AS userEmail
                            FROM 
                        cart c
                            JOIN 
                        products p ON c.product_id=p.prodid
                            JOIN 
                        user u ON u.id=c.user_id
                            WHERE 
                            c.user_id=?`

        const fetchCart=await db.execute(query,[user_id])
        // console.log(fetchCart[0])
        return fetchCart[0]
    }
    
    static deleteProductDetails=async(product_id)=>{
        try {
            const deleteCart=await db.execute('DELETE FROM cart WHERE product_id=?',[product_id])
            return deleteCart
        } catch (error) {
            console.log("--ERROR IN MODEL---",error)
        }
        
    }

}

const db=require('../util/database');

module.exports=class Product{
   
    static createProduct=async(name,description,price)=>{

        try{
            const product=await db.execute('INSERT INTO products(name,description,price) VALUES(?,?,?)',[name,description,price])
            // console.log(product)
            console.log(typeof product)

            
            console.log('hai i am form model')
            //check the product is there in the array
            return product[0]
            // const productdata='i am product'
            // return product
            // return productdata
        }
        catch(err){
            console.log('MODEL error in products',err)
            throw err
        }

            
    }
    static fetchProducts=async()=>{
        const allProducts=await db.execute('SELECT * FROM products')
        console.log(allProducts[0])
        // console.log(typeof allProducts)
        return allProducts[0]
    }
}
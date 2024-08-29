const Product=require('../models/modelProduct')

const productCreate=async(name,description,price)=>{

    // console.log('name',name);
    // console.log('desc',description);
    // console.log('price',price);
    // console.log('from service layer name',name);
    
    try{
        const createProduct=await Product.createProduct(name,description,price);
        // console.log(createProduct);
        // const createProduct=await Product.createUser();
        console.log('service funtn')
        // return createProduct
        return createProduct
    }
    catch(err){
        console.log(err)
    }
    
}

const AllProduts=async()=>{
    try{
        const prodDetils=await Product.fetchProducts()
        console.log('hei i am productdetails form service')
        return prodDetils
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports={productCreate,AllProduts};
// module.exports=AllProduts;
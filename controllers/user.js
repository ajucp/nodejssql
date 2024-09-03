const User=require('../models/user')
const userCreate=require('../service/userService')
// import { userCreate } from '../service/userService';


exports.postCreateUser=async(req,res,next)=>{
    // const firstName=req.body.firstName;
    // const lastName=req.body.lastName;
    // const email=req.body.email;
    try{
        console.log(JSON.stringify(req.body), 'INCOMING DATA FROM POSTMAN')
        const {
            firstName,
            lastName, 
            email
        } = req.body;
        // ADD SERVICE LAYER
        const userData = await userCreate(firstName, lastName, email);
        res.send({userData})
    }
    catch(err){
        console.log('error in creating user',err)
        res.send({error: err})//sending the response
    }
}


exports.getUser=(req,res,next)=>{
    User.fetchAll()
    .then(result=>{
        res.send(result[0])
    })
    .catch(err=>{
        console.log(err)
        throw err
    })
}
exports.getUserById=(req,res,next)=>{
    const userID=req.params.userID;    //store the id values to userId
    User.findByID(userID)
    .then(([row])=>{
        if(row.length>0){
            res.json(row[0])
        }
        else{
            res.send('user not found')
        }
    })
    .catch(err=>{
        console.log(err)
        throw err
    })
}



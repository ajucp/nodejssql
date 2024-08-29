const User=require('../models/user');//to connect the model


const userCreate = async(firstName,lastName, email) =>{
    console.log('from service layer')
    console.log('service layer first name', firstName)
    console.log('service layer last name', lastName)
    console.log('service layer email', email)
    try {
        // TODO : ADD MODEL
        const emailDetails = await User.getEmail(email);
        console.log('service layer emailDAta :',emailDetails)
        // TODO: ADD IF ELSE CONDTION TO HANDLE USRE CREATION

        if(emailDetails.length > 0 && emailDetails[0] && emailDetails[0].email == email) {
            // EMAIL ALREADY EXIST
            // TODO: return object havinb email already exist
            const emailExistData = { message: `the incoming email is already registerd, incoming emailId: ${email}. Please try with another email ID `};

            return emailExistData

        } else {
            // THERE IS NO EMAIL EXIST ON DB. SO WE ARE GOING TO CREATE THIS EMAIL USER
            // TODO: ADD USER CREATION FUNCTION 
            const userData = await User.createNewUser(firstName, lastName, email);

            
            if(userData && userData.insertId) {
                const userResponseData= {
                   email: email, 
                   firstName: firstName,
                    lastName: lastName
                }
                console.log('userresponce',userResponseData)
                return userResponseData;
            } else {
                const responseData = {message: "something went wrong"};
                return responseData;
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports=userCreate;

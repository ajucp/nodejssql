const db=require('../util/database')

module.exports =class User{
    constructor(firstName,lastName,email){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
    }

    static getEmail = async(email) => {
        console.log('from model layer EMAIL', email)
        try {
        // TODO: ADD SQL QUERY
        const emailData = await db.execute('SELECT * FROM user WHERE email=?',[email])
        console.log('model layer emailData:', JSON.stringify(emailData))
        
        console.log(typeof emailData, 'type of email data from model')
        return emailData[0]
        } catch(err){
            console.log('model layer error', err);
            return err;
        }
    }

    static createNewUser = async(frstName, lstName, eml) => {
        try {
            // TODO: ADD SQL QUERY
            const userData = await db.execute('INSERT INTO user(firstName,lastName,email) VALUES(?,?,?)',[frstName, lstName, eml])

            return userData[0];
        } catch (err) {
            console.log('model layer error', err);
            return err
        }
    }

    static fetchUserDetails=async(user_id)=>{
        try {
            console.log('fetch user details')
            const fetchUser=await db.execute('SELECT email FROM user WHERE id=?',[user_id])
            // console.log(fetchUser[0])
            return fetchUser[0]
        } catch (err) {
            console.log(err)
            throw err
        } 
    }

static fetchAll(){
    try {
        return db.execute('SELECT * FROM user')
    } catch (err) {
        console.log(err)
        throw err
    } 
       
}
static findByID(userID){
    try {
        return db.execute('SELECT * FROM user WHERE id = ?',[userID]);
    } catch (err) {
        console.log(err)
        throw err
    }
    
}
}
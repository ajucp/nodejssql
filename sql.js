const express=require('express');

const bodyParser=require('body-parser');
const UserRoutes=require('./routes/admin')
const app=express();

const db=require('./util/database')

app.use(bodyParser.json());
app.use('/api/v1',UserRoutes);

// db.execute('CREATE TABLE user(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,firstName varchar(255),lastName varchar(255),email varchar(255) NOT NULL UNIQUE)')
// db.execute('CREATE TABLE products(Prodid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name varchar(255) NOT NULL,description varchar(255),price INT NOT NULL)')

// db.execute('CREATE TABLE cart(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,product_id INT NOT NULL,user_id INT NOT NULL,quantity INT NOT NULL,FOREIGN KEY (product_id) REFERENCES products(prodid),FOREIGN KEY (user_id) REFERENCES user(id))')
app.listen(3000)


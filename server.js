require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT || 2345
const sequelize = require('./database/database');
const customerRouter = require('./routers/customerRouter')

const app = express();


app.use(express.json());


app.use(customerRouter)


const dbConnection = async ()=>{
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

dbConnection();

app.listen(PORT, ()=>{
    console.log(`Server is running successfully on PORT: ${PORT}`)
})
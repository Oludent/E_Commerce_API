require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT || 2345
const sequelize = require('./database/database');

const customerRouter = require('./routers/customerRouter')
const productRouter = require('./routers/productRouter')
const categoryRouter = require('./routers/categoryRouter')
const orderRouter = require('./routers/ordersRouter')
const cartRouter = require('./routers/cartRouter')
const cartItemRouter = require('./routers/cartItemRouter')

const app = express();


app.use(express.json());


app.use(customerRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(orderRouter);
app.use(cartRouter);
app.use(cartItemRouter);


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
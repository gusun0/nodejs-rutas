const express = require('express');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');

// creamos la app
const app = express();

// middleware
app.use(express.json());

// registramos nuestros routers
app.use('/users',usersRouter);
//app.use('/orders',ordersRouter);

app.listen(3000, () => console.log('API ready prot: 3000...'));



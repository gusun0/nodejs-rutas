const express = require('express');
const validations = require('./validations');
const app = express();

// ponemos un middleware para poder ingresar a los datos de req.body
// esto parsea el body dentro de req.body
app.use(express.json());

// hacemos un helper en validations
app.post('/users',validations.validate(validations.createUsersValidation),(req,res) => {
   const { name, age, email } = req.body; 
   

   res.json({
  	status: 'ok', 
   });
});


// registramos un middleware para asegurarnos de que la validaciones funcionen

app.use((error,req,res,next) => {
  res.status(400).json({
  	status: 'error',
	message: error.message,
  });

});



app.listen(3000, () => console.log('API readt port: 3000 ...'));

const express = require('express');
const validations = require('./validations');
const errorMiddlware = require('./middleware/errors');
const isAdminMiddleware = require('./middleware/isAdmin');

const app = express();

// registrando eventos en nodejs
// esto se hace por si no ponemos el try catch en la ruta, para que atrape en error
// atrapa promesas rechazadas
/*
process.on('unhandledRejection', (error) => {
  console.log(error);
});

// atrapa excepciones
process.on('uncaughException', (error) => {
  console.log(error);
});

*/

// ponemos un middleware para poder ingresar a los datos de req.body
// esto parsea el body dentro de req.body
app.use(express.json());

// hacemos un helper en validations
// aqui implementamos un middleware de validación
app.post('/users',isAdminMiddleware,validations.validate(validations.createUsersValidation), async (req,res,next) => {
   try{
      throw new Error('hello');
      res.json({
  	status: 'ok', 
      });
   }catch (error){
       next(error);
   }


});

// del uncaugh reception
/*
throw new Error('adios');
*/

// registramos un middleware para asegurarnos de que la validaciones funcionen
// este middleware recibe todos los errores
app.use(errorMiddlware);

app.listen(3000, () => console.log('API readt port: 3000 ...'));

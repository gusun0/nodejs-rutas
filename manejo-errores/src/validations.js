const yup = require('yup'); /* esta libreria nos brinda un esquema para validar datos */
const ValidationError = require('./errors/validationError');
// creando el helper validate
/* validation es una fn createUsersValidation*/

function validate(validation){
 return (req,res,next) =>{
	 try{
   		validation(req.body); 
		next();
	 }catch(error){
  	        next(new ValidationError(error));
	 }
 };
}
/* Forma #1 */
/*
function createUsersValidation2(data){
   const {name, age, email} = data;

   if(typeof name !== 'string'){
  	throw new Error('name must be a string'); 
   }

   if(name.length <= 5){
  	throw new Error('name must be at least 5 characters'); 
   }

   if(!(/^[a-z]+$/i.test(name))){
  	throw new Error('name must contain onlye a-z charecters'); 
   }

  // --------------------------------
   if(typeof age !== 'number'){
  	throw new Error('age must be a string'); 
   }

   if(age <= 0){
  	throw new Error('age must be greater than 0'); 
   }

   if(age > 100){
  	throw new Error('age must be less than 100'); 
   }


  // --------------------------------

   if(typeof email !== 'string'){
  	throw new Error('email must be a string'); 
   }

   if(!(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i.test(email))){
  	throw new Error('email must be valid'); 
   }

}

*/
function createUsersValidation(data){
   // creando un esquema de yup
   const schema = yup.object().shape({

      /* shape es el tipo de campos que queremos en el objeto */
      name: yup
	   .string('name must be a string')
	   .min(5)
	   .matches(/^[a-z]+$/i)
	   .required(),

      age: yup
	   .number()
	   .min(1)
	   .max(100).integer().required(),
    
      email: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i).required(),
   
   }); 
   
   schema.validateSync(data);

}

module.exports = {
  createUsersValidation,
  validate,
};


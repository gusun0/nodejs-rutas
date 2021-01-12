// el routeHelper hace toda la estructura del try-catch por nosotros
// el routeHelper se encarga del manejo de errores, por lo tanto en las rutas
// solo pondremos las funciones que se ejecuten correctamente

function routeHelper(callback){
	/* nuestro helper regresa una fn, por eso se usa return */
return async (req,res) => {
  try{
     await callback(req,res); 
  }catch(error){
	  res.status(404).json({
		status: 'error',
		message: error.message,
	  });
  }
 }
}

function sleep(ms){
 return new Promise(resolve => setTimeout(resolve,ms));
}

function addUserToDB(){
 return new Promise((resolve,reject) => setTimeout(() => reject(new Error('Hubo un problema')),500));
}


module.exports = { routeHelper,sleep,addUserToDB};

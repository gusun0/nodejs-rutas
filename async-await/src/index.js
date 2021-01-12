const express = require('express');
const { routeHelper, sleep, addUserToDB } = require('./route');
const app = express();
app.use(express.json());


/* Nuestro Helper regresa una fn */
//
app.get('/test', routeHelper(async (req,res) => { 
	//await sleep();
	//await test();
//	if(true){
//	throw new Error('error crítico');
//	}
	res.json({
		status: 'ok',	
	});
}));

app.get('/test-2', routeHelper(async (req,res) => {
  try{

  }catch(error){
     if(error.code){
	  res.status(404).json({
		status: 'error',
		message: error.message,
	  });
     }
  }
}));

app.listen(3000, () => console.log('API ready port: 3000 ...'));

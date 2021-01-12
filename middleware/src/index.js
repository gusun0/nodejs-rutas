const express = require('express');
const app = express();

async function getUser(){
	return{
		id: 123,
		name: 'leo',
	};
}




// esta línea usa el middleware de express json
//app.use(express.json());


// Creando nuestro propio middleware
// next es una fn callback que nos permite tener el control del flujo del req
app.use((req,res,next) => {
	if(req.ip === '182.15.25.48'){
		next(new Error('error!!!'));	
	}else{
		next();
	}
});

const middleWare = async (req,res,next) => {
	const user = await getUser();
	req.locals = { user: user };
	next();
};

app.get('/test',middleWare, async (req,res) => {

  const user = req.locals.user;

 res.json({
	status: 'ok',
	user,
 });
});

app.get('/test-2',async (req,res) => {

  const user = req.locals.user;

 res.json({
	status: 'ok',
	user,
 });
});

app.listen(3000, () => console.log('API ready port: 3000 ...'));



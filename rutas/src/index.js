const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

// middlware => fn que se ejecuta antes de llegar a una ruta

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());


app.get('/users/test', () => {});

app.post('/users/:userId',(req,res) => {

	const { userId } = req.params || {};
	const { test } = req.query || {};
	const { name,age } = req.body || {}; /* este es para el método post */
	const ip = req.ip;
	const cookies = req.cookies;
	const headers = req.headers;

  res.json({
	id: req.params.userId,
	name: 'leo',
	age: 100,
        test,
//	contentType,
	ip: ip,
	cookies: cookies,
	headers: headers,
  });
});

app.get('/users/error',(req,res) => {
   res.sendStatus(404);
});

app.get('/users/error-code',(req,res) => {
  res.status(401).json({
        error: 'hubo algún error',
  });
});


app.get('/users/send',(req,res) => {
   res.status(201).send('<h1>HOLA</h1>');
});

app.get('/users/send-buffer',(req,res) => {
   res.status(201).send(new Buffer('esto es un buffer'));
});


// MANDANDO HEADERS 
app.get('/users/send-header',(req,res) => {
   res.set({
	    'Content-Type': 'application/json',
	    'x-mi-cache': 'cacheId',
	   });
    
    res.append('x-mi-cache-v2','cacheIdV2');

   res.json({
	   status: 'ok',
   });

});

// Mandar una cookie
app.get('/users/send-cookie',(req,res) => {

   // Este método nos permite crear un cookie 
   res.cookie('mi-cookie','12345',{
 	path: '/',
	maxAge: 1000 * 60 * 60 * 24, /* Número de segundos que quieres que expire */
   });

   res.cookie('mi-cookie2','6789',{
 	path: '/',
	maxAge: 1000 * 60 * 60 * 24, /* Número de segundos que quieres que expire */
   });

   res.json({
	   status: 'ok',
   });

});

app.get('/users/clear-cookie',()=>{
  res.clearCookie('mi-cookie');

  res.json({
	  status: 'ok',
  });
});


app.get('/users/redirect-location',(req,res)=>{
  res.redirect(path.join(__dirname,'file.txt'),'hola.txt'); 
});

// PARA HACER UNA RUTA DE DESCARGA
app.get('/users/download',(req,res)=>{
  res.download(__dirname +'/file.txt'); 
});



app.listen(3000, () => console.log('API ready'));

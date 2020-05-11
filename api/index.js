module.exports = function(app) {
	const express = require("express");
	const router = express.Router();
    const path = require('path');
    const p = path.join(__dirname, './../public/index.html');

    const swaggerUi = require('swagger-ui-express');
    const swaggerJSDoc = require('swagger-jsdoc');

    const swaggerDefinition = {
        info: {
            title: 'Appointment Swagger API',
            version: '1.0.0',
            description: 'Endpoints to test the doctor appointment booking routes',
        },
        host: 'localhost:5000',
        basePath: '/',
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
    };

    const options = {
        swaggerDefinition,
        apis: ['./api/routes/*.js'],
    };

    const swaggerSpec = swaggerJSDoc(options);
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    
	router.use(function (req,res,next) {
        console.log("/" + req.method);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		next();
    });

    router.use("http://localhost:5000/", function (req, res) {
        console.log('/', req.method);
    });

    require('./routes/doctor.js')(app);
    require('./routes/appointment.js')(app);
    require('./routes/slot.js')(app);
    
    app.get('/', (req,res) => {
        res.sendFile(p);
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("http://localhost:5000/", router);

	app.use("*", (req,res) => {
		res.sendFile(p);
	});
}

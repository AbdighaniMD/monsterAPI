const express = require('express');

const db = require('./Config/db');
const monstersRoutes = require('./Routes/monstersRoute');
const habitatsRoutes = require('./Routes/habitatsRoute');

const app = express();

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api/v1/habitats', habitatsRoutes);
app.use('/api/v1/monsters', monstersRoutes);


//Error handler Middleware
app.use((err, req, res, next) =>{
    res.status(500).json({
        status: "Failed",
        message: err.message,
    });
});

//404 error
app.use('*', (req, res) => {
    console.log(req.originalUrl);
    res.status(404).json({ 
        message: `${req.originalUrl} - Route Not Found`,
    });
});


//Listen to server
const PORT = process.env.PORT || 3090;
const start = async () => {
    try{
        app.listen(PORT, () =>{
            console.log(`Server is up and running on port ${PORT}`);
        }); 
    }catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}
start();

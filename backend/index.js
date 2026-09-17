const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


console.log("Index file started");

//import required modules
const express= require('express');
const app= express();

const dotenv= require('dotenv');
dotenv.config();
const userRoutes= require('./routes/User');
const profileRoutes= require('./routes/Profile');
const paymentRoutes= require('./routes/Payment');
const courseRoutes= require('./routes/Course');
const contactRoutes= require('./routes/contact');

const {connectDB}= require('./config/database');
//connect to database
connectDB();
app.use(express.json());


const cookieParser= require('cookie-parser');
app.use(cookieParser());

//to connect with frontend
const cors= require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const{configureCloudinary}= require('./config/cloudinary');
configureCloudinary();

const fileUpload= require('express-fileupload');
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

const PORT=4000;

app.use((req,res,next)=>{
    console.log("METHOD:", req.method);
    console.log("URL:", JSON.stringify(req.url));
    next();
});
//define routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/payment',paymentRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/contact',contactRoutes);

app.get('/',(req,res)=>{
    console.log("Welcome route hit");
    res.send("Welcome to StudySphere");
    return res.json({
        success:true,
        message:"Welcome to StudySphere"
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
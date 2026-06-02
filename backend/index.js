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
    origin: 'http://localhost:3000',
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

// console.log("user routes:", userRoutes);
// console.log("course routes:", courseRoutes);
// console.log("payment routes:", paymentRoutes);
// console.log("profile routes:", profileRoutes);
// console.log("contact routes:", contactRoutes);

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
app.get("/test", (req,res)=>{
    console.log("TEST ROUTE HIT");
    res.send("Server working");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
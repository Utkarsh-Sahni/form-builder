import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import formRoutes from './routes/api.js'

dotenv.config();

const corsOptions = {
    origin : '*'
}

const app= express();
app.use(express.json());
app.use(cors(corsOptions));


// DB connection
const PORT=3001;
const MONGO_URL= 'mongodb+srv://utkarsh:utkarsh@cluster0.la9faq3.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(()=> { console.log( 'Database Connected'); })
.catch((err) => { console.log('DB connection failed: ', err); })


app.use("/api/form", formRoutes);


app.listen(PORT, ()=> {
    console.log('listening at port: ', PORT);
})
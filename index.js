import express from 'express'

import dotenv from 'dotenv';
import { connectDB } from './db.js';
dotenv.config();
import bodyParser from 'body-parser';
import userRoute from './routes/userRoutes.js';
import adminRoute from './routes/adminRoutes.js';


const app = express();
// Parse incoming requests with JSON payloads
app.use(bodyParser.json()); // Adjust the limit as needed

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRoute)
app.use('/admin',adminRoute)

const port = process.env.PORT // Default to port 5000 if process.env.PORT is not set

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

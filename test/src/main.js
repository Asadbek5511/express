import express from 'express';
import { config } from 'dotenv';
config();

import { connectDB } from './config/db.js';
import router from './routers/index.route.js'

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
await connectDB()

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
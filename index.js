import express from 'express';
import controller from './src/controller/index.js'
import 'dotenv/config.js'

const PORT=process.env.PORT
const app= express();

app.use(express.json())
app.use(controller)


app.listen(PORT,()=>console.log(`App is listening port ${PORT}`))

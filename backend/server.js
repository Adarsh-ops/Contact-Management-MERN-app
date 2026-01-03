require('dotenv').config();
const express=require('express');
const router=express.Router();

const mongoose=require('mongoose')
const cors=require('cors')

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('MongoDB connected!!'))
.catch((err)=> console.log('MongoDB failed to connect!!', err))

app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
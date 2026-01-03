const express=require('express');
const router=express.Router();
const Contact=require('../models/contact')

router.get('/',async(req,res)=>{
    try{
        const contacts=await Contact.find().sort({createdAt:-1});
        res.json(contacts);
    }catch(error){
        console.log(error)
        res.status(500).json({message: (error.message)})
    }
})

router.post('/',async(req,res)=>{
    const {name,email,phone,message}=req.body;
    const contact=new Contact({name,email,phone,message});

    try{
        const newC=await contact.save();
        res.status(201).json(newC);
    }catch(error){
        console.log(error);
        res.status(400).json({message: error.message})

    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await Contact.findByIdAndDelete(id);
        res.json({message: 'Contact deleted! '})
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

module.exports=router;
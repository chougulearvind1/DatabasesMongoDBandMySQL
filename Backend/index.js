const express = require('express');
const cors = require('cors');
const storage =require('node-persist')

const app =express();


app.use(cors());
app.use(express.json())

app.listen(5000,async () => { 
    console.log('server running on http://localhost:5000');
    await storage.init({dir:'persist'})
    await storage.clear() // storage clear is used 
 })

 app.get('/tasks',async (req,res) => { 
    
    const tasks= await storage.getItem('tasks')||[]
    res.json(tasks)
  })


  app.post('/tasks', async (req,res) => { 
    const {Task}=req.body;
    if(!Task){
        return res.status(400).json({error: 'task is required'})
    }
    const tasks= await storage.getItem('tasks')||[];
     tasks.push(Task)
     await storage.setItem('tasks',tasks)
     res.json({Success:true})
   })
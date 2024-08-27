const express = require('express');
const cors = require('cors');
const mysql =require('mysql2/promise')
const app =express();
app.use(cors());
app.use(express.json())
let db;
app.listen(5000,async () => { 
    console.log('server running on http://localhost:5000');
     db = await mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'root',
      database:'taskdb'
    })
    await  db.connect((err) => { 
      if(err){throw err;}
       console.log('MYSQL Connected ....');
     })
 })

 app.get('/tasks',async (req,res) => { 
    let [result]=await  db.query('select * from tasks');
    res.json(result)
  })


  app.post('/tasks', async (req,res) => { 
    const {Task}=req.body;
    if(!Task){
        return res.status(400).json({error: 'task is required'})
    }
    const tasks= await db.query('insert into tasks (TaskList) values (?)',[Task]);
    
    
      res.json({Success:true})
   })


   app.delete('/tasks', async (req,res) => { 
    const Task=req.body;
    if(!Task){
        return res.status(400).json({error: 'task is required To delete'})
    }
    try {   
           await db.query('DELETE FROM `tasks` WHERE `TaskList` = ?',[Task.TaskList]);
    } catch (error) {
      console.log(error,'delete data error');
    }
     
    res.json({Success:true})
    })

    app.post('/clean', async (req,res) => { 
      console.log("clean is called ");
      try {   
             await db.query('DELETE FROM `tasks`');
      } catch (error) {
        console.log(error,'delete data error');
      }
       
      res.json({Success:true})
      })
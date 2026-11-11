const express=require("express");
const app=express();

app.use(express.json());

let students=[]
let id=1;

//get
app.get("/students",(req,res)=>{
    res.json(students);
});

app.get("/students/:id",(req,res)=>{
    let s=students.find(x=>x.id==req.params.id);
    if(!s){
        return res.status(404).json({message:"Student not found"});
    }
    res.json(s);
})

//post
app.post("/students",(req,res)=>{
    const {name,roll,email}=req.body;
    if(!name||!roll||!email){
        return res.status(400).json({message:"All fields are required"});
    }
    let s ={id:id++,name,roll,email};
    students.push(s);
    res.status(201).json(s);
})

//delete
app.delete("/students/:id",(req,res)=>{
    let s=students.find(x=>x.id==req.params.id);
    if(!s){
        return res.status(404).json({message:"Student not found"});
    }
    students.splice(students.indexOf(s),1);
    res.json({message:"Student deleted successfully"});
})

//put
app.put("/students/:id",(req,res)=>{
    let s=students.find(x=>x.id==req.params.id);
    if(!s){
        return res.status(404).json({message:"Student not found"});
    }
    const {name,roll,email}=req.body;
    if(!name||!roll||!email){
        return res.status(400).json({message:"All fields are required"});
    }
    s.name=name;
    s.roll=roll;
    s.email=email;
    res.json(s);
});

app.listen(3000,()=>
    console.log("Server is running on port 3000")
);
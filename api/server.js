const express= require("express");
const server= express();
const actionDB= require('../data/helpers/actionModel');
const projectDB= require('../data/helpers/projectModel');
server.use(express.json());
server.get("/", (req, res)=>{
    res.status(200).json({api:"running"});
});
//Projects
server.get("/api/projects",(req, res)=>{
    projectDB
        .get()
        .then(projects=>{
            res.status(200).json(projects);
        })
        .catch(error=>{
            res.status(500).json({message:'Cant not fetch project'});
        })
})
server.get("/api/projects/:id", (req, res)=>{
    const {id}= req.params;
    projectDB
        .get(id)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(error=>{
            res.status(500).json({message: "cant fetch project"});
        })
})
server.post("/api/projects", async (req, res)=>{
    try{
        const projectData= req.body;
        const projectID=await projectDB.insert(projectData);
        const project= await projectDB.get(projectID.id);
        res.status(201).json(project);
    }catch(error){
        let message="error creating the project";
        if(error.errno==19){
            message= "please provide all required fields"
        }
        res.status(500).json({message, error});
    }
})
server.put("/api/projects/:id", (req, res)=>{
    const {id}= req.params
    const changes= req.body;
    projectDB
        .update(id, changes)
        .then(count=>{
            if(count){
                res.status(200).json({message:`project updated`});
            }else{
                res.status(404).json({message: "project not found"})
            }
        })
        .catch(error=>{
            res.status(500).json({message: "error updating the user"});
        })
})
server.delete("/api/projects/:id", (req, res)=>{
    const {id}= req.params
    projectDB
        .remove(id)
        .then((count)=>{
            if(count){
                res.status(200).json({message:"Project deleted"})
            }
            else{
                res.status(404).json({message: "project not found"})
            }
        })
        .catch(error=>{
            res.status(500).json({message: "error deleting the project"})
        })
})
server.get("/api/projects/action/:id", (req, res)=>{
    const { id } = req.params;
    projectDB
      .getProjectActions(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({ messsage: "cant fetch" });
      });
  })
//Actions
server.get("/api/actions",(req, res)=>{
    actionDB
        .get()
        .then(projects=>{
            res.status(200).json(projects);
        })
        .catch(error=>{
            res.status(500).json({message:'Cant not fetch project'});
        })
})
server.get("/api/actions/:id", (req, res)=>{
    const {id}= req.params;
    actionDB
        .get(id)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(error=>{
            res.status(500).json({message: "cant fetch project"});
        })
})
server.post("/api/actions", async (req, res)=>{
    try{
        const actionData= req.body;
        const actionID=await actionDB.insert(actionData);
        const project= await actionDB.get(actionID.id);
        res.status(201).json(project);
    }catch(error){
        let message="error creating the project";
        if(error.errno==19){
            message= "please provide all required fields"
        }
        res.status(500).json({message, error});
    }
})
server.put("/api/actions/:id", (req, res)=>{
    const {id}= req.params
    const changes= req.body;
    actionDB
        .update(id, changes)
        .then(count=>{
            if(count){
                res.status(200).json({message:`project updated`});
            }else{
                res.status(404).json({message: "project not found"})
            }
        })
        .catch(error=>{
            res.status(500).json({message: "error updating the user"});
        })
})
server.delete("/api/actions/:id", (req, res)=>{
    const {id}= req.params
    actionDB
        .remove(id)
        .then((count)=>{
            if(count){
                res.status(200).json({message:"Project deleted"})
            }
            else{
                res.status(404).json({message: "project not found"})
            }
        })
        .catch(error=>{
            res.status(500).json({message: "error deleting the project"})
        })
})
console.log('working');
module.exports=server;
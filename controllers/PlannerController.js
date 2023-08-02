import Planner from "../models/PlannerModel.js";
import path from "path";
import fs from "fs";

export const getPlanners = async(req, res)=> {
    try {
        const response = await Planner.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPlannerById = async(req, res)=> {
    try {
        const response = await Planner.findOne({
            where: {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const savePlanner = (req, res)=> {
    if(req.files === null) return res.status(400).json({message: "No File Uploaded"});
    const { task, description } = req.body;
    const image = req.files.image;
    const ext = path.extname(image.name);
    const fileName = image.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];
      
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});

    image.mv(`./public/images/${fileName}`, async(err)=>{
      if(err) return res.status(500).json({msg: err.message});
      try {
          await Planner.create({task: task, description: description, image: fileName, url: url});
          res.status(201).json({msg: "Planner Created Successfuly"});
      } catch (error) {
          console.log(error.message);
      }
  })
}

export const updatePlanner = async(req, res)=> {
  const planner = await Planner.findOne({
    where:{
        id : req.params.id
    }
  });
  if(!planner) return res.status(404).json({msg: "No Data Found"});

  let fileName = "";
    if(req.files === null){
        fileName = planner.image;
    }else{
        const image = req.files.image;
        const ext = path.extname(image.name);
        fileName = image.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});

        const filepath = `./public/images/${planner.image}`;
        fs.unlinkSync(filepath);

        image.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const { task, description } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Planner.update({task: task, description: description, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Planner Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePlanner = async(req, res)=> {
  const planner = await Planner.findOne({
    where:{
        id : req.params.id
    }
  });
  if(!planner) return res.status(404).json({msg: "No Data Found"});

  try {
    const filepath = `./public/images/${planner.image}`;
    fs.unlinkSync(filepath);
    await Planner.destroy({
        where:{
            id : req.params.id
        }
    });
    res.status(200).json({msg: "Planner Deleted Successfuly"});
} catch (error) {
    console.log(error.message);
}
}
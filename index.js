import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors"; 
import PlannerRoute from "./routes/PlannerRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(PlannerRoute);

app.listen(5000, ()=> console.log('Server Up and Running...'));
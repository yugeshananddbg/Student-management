import {app} from "./app.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config({path: "backend/config/config.env"})

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((c) => {
      console.log(`Mongodb connnected to : ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(`Error: ${e}`);
    });
};
connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on Port ${process.env.PORT}`)
})
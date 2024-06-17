import express from "express";

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
   res.status(200).send("You are getting root!")
})

app.listen(9000, () => {
    console.log("Server running on port 9000");
})
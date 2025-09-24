const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//initierar port och express
const app = express();
const port = process.env.PORT || 9000;

//cors och JSON
app.use(cors());
app.use(express.json());

//koppla till mongoDB
mongoose.connect("mongodb://localhost:27017/bck-mom3").then(() => {
    console.log("Kopplad till mongoDB");
}).catch((error) => {
    console.log("Det blev i anslutningen till mongoDB: " + error); 
});

//schema - ett schema för varje önskad tabell
const jobSchema = new mongoose.Schema({
    //ange attribut
    companyName: {
        type: String,
        required: [true, "Du behöver fylla i företagsnamnet"],
    },
    jobTitle: {
        type: String, 
        required: [true, "Du behöver fylla i jobbtiteln"],
    },
    endDate: {
        type: String,
        required: [true, "Du behöver fylla i slutdatumet"],
    },
    description: {
        type: String,
        required: [true, "Du behöver skriva en förklaring"],
    }
});

//en model är typ som en tabell? behöver skriva vilket schema den ska använda
const job = mongoose.model("Job", jobSchema);

//router
app.get("/api", async (req, res) => {
    res.json({message: "Välkommen"});
});

//ska vara en async pga vi ska göra anrop därifrån
app.get("/api/jobs", async (req, res) => {
    try {
        //hämta alla jobb
        let result = await job.find({}); //ett tomt objeckt säger att vi vill hämta allt 
        res.status(200).json(jobs);
        return res.json(result);    
    } catch(error) {
        return res.status(500).json({error: error.message}); //är 500 för det är på serversidan
    }
});

app.post("/api/jobs", async (req, res) => {
    try {
        let result = await job.create(req.body);

        return res.json(result);
    } catch(error) {
        return res.status(400).json({error: error.message}); //är 400 för det är på klientsidan
    }
});

//uppdatera jobb
app.put("/api/jobs:id", async (req, res) => {
    try {
        const { id } = req.params;

        const job = await job.findByIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(404).json({ message: "Jobbet hittades inte" });
        }

        const updatedJob = await job.findById(id) {}
        res.status(200).json(updatedJob);
    }


});

app.listen(port, () => {
    console.log("Servern är igång på port: ", port);
});
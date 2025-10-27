//skapad med hjälp av videon https://www.youtube.com/watch?v=_7UQPve99r4 (freeCodeCamp.org på YouTube)

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//initierar port och express
const app = express();
const port = process.env.PORT || 9000;

//cors och JSON
app.use(cors({
    origin: "http://localhost:1234",
    methods: "GET,POST,PUT,DELETE",
}));
app.use(express.json());


//koppla till mongoDB
mongoose.connect("mongodb://localhost:27017/bck-mom3").then(() => {
    console.log("Kopplad till mongoDB");
}).catch((error) => {
    console.log("Det blev i anslutningen till mongoDB: " + error); 
});

//schema - ett schema för varje önskad tabell
const jobSchema = new mongoose.Schema({
    //anger attribut (samt ger ett felmeddelande om ett attribut inte finns med)
    jobTitle: {
        type: String, 
        required: [true, "Du behöver fylla i en jobbtitel"],
    },
    companyName: {
        type: String,
        required: [true, "Du behöver fylla i ett företagsnamn"],
    },
    endDate: {
        type: String,
        required: [true, "Du behöver fylla i ett slutdatum"],
    },
    description: {
        type: String,
        required: [true, "Du behöver skriva en förklaring"],
    }
});


const job = mongoose.model("Job", jobSchema);


//router
app.get("/api", async (req, res) => {

    if(error) {
        res.status(500).json({error: "Något gick fel: " + error} );
        return;
    }

    res.status(200).json( {message: "Välkommen, api funkar"} );
});


//hämta jobb
app.get("/api/jobs", async (req, res) => {
    try {
        //hämta alla jobb
        let result = await job.find({}); 

        res.status(200).json(result);
   
    } catch(error) {
        return res.status(500).json({error: error.message}); 
    }
});


//skapa jobb
app.post("/api/jobs", async (req, res) => {
    try {
        let result = await job.create(req.body);

        return res.json(result);

    } catch(error) {
        return res.status(400).json({error: error.message}); 
    }
});


//uppdatera jobb
app.put("/api/jobs/:id", async (req, res) => {
    try {
        //hämtar id
        const { id } = req.params;

        //hämtar rätt jobb baserat på id
        const updatedJob = await job.findByIdAndUpdate(id, req.body, { new: true }); 

        //validering
        if(!updatedJob) {
            return res.status(404).json({ message: "Jobbet hittades inte" });
        }

        res.status(200).json(updatedJob);

    } catch(error) {
        res.status(500).json({ message: "Något blev fel: " + error.message });
    }
});


//ta bort jobb
app.delete("/api/jobs/:id", async (req, res) => {
    try {
        //hämtar id
        const { id } = req.params;

        //hämtar rätt jobb baserat på id
        const deletedJob = await job.findByIdAndDelete(id);

        //validering
        if(!deletedJob) {
            return res.status(404).json({ message: "Jobbet hittades inte" });
        }

        res.status(200).json({ message: "Jobbet har tagits bort" });

    } catch (error) {
        res.status(500).json({ message: "Något blev fel: " + error.message });
    }
});

//starta servern
app.listen(port, () => {
    console.log("Servern är igång på port: ", port);
});
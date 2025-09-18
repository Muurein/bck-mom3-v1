const express = require("express");
const cors = require("cros");

//initierar port och express
const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

//router
app.get("/api", async (req, res) => {
    res.json({message: "Välkommen"});
})

app.listen(port, () => {
    console.log("Servern är igång på port: ", port);
})
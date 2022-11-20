require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const imageRouter = require("./router/ImageRouter")

// config
const app = express();
const PORT = process.env.PORT || 3002;

//middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// view
app.use(express.static(path.resolve(__dirname, "../client/build")))

app.use(imageRouter)

app.get("/api", (req, res) => {
    res.send({msg: "Hello world"})
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})
app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});


module.exports = {
  server: app
}
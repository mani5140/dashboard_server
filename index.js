const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cors());

const pieSchema = mongoose.Schema({
    product:String,
    units:Number
});

const lineSchema = mongoose.Schema({
    weeks:String,
    guest:Number,
    user:Number
})

const pieModel = mongoose.model("piecharts",pieSchema);
const lineModel = mongoose.model("linecharts",lineSchema);

app.get("/",(req,res) => {
res.setHeader("Access-Control-Allow-Credentials","true");
res.send("API is running..");
});

app.get("/piechart", async(req,res) => {
    let data = await pieModel.find();
    res.send(data);
})
app.get("/linechart", async(req,res) => {
  let data = await lineModel.find();
  res.send(data);
})

app.post("/piechart", async (req,res) => {
    let data = new pieModel(req.body);
    let response = await data.save();
    res.send(response);
})

app.post("/linechart", async (req,res) => {
  let data = new lineModel(req.body);
  let response = await data.save();
  res.send(response);
})

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

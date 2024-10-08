const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const schema = require("./Schema");
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://23010101425:hello@cluster0.yjl8g.mongodb.net/Laptops")
  .then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    app.get("/Laptop", async (req, res) => {
      try {
        const ans = await schema.find();
        res.send(ans);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
      }
    });
    app.get("/Laptop/:item", async (req, res) => {
      try {
        const ans = await schema.findOne({
          item: req.params.item,
        });
        res.send(ans);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
      }
    });
    app.post("/Laptop/add", async (req, res) => {
      try {
        const temp = new schema(req.body);
        const result = await temp.save();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
      }
    });
    app.delete("/Laptop/:item", async (req, res) => {
      try {
        const ans = await schema.deleteOne({
          item: req.params.item,
        });
        res.send(ans);
      } catch (err) {
        console.error(err);
        res.status(400).send("Invalid data");
      }
    });
    app.patch("/Laptop/:item", async (req, res) => { // Updated route to match frontend
      try {
          const laptop = await schema.findOne({ item: req.params.item });
  
          if (!laptop) {
              return res.status(404).send("Data not found");
          }
  
          if (req.body.name) laptop.name = req.body.name;
          if (req.body.BrandName) laptop.BrandName = req.body.BrandName;
          if (req.body.RAM) laptop.RAM = req.body.RAM;
          if (req.body.avatar) laptop.avatar = req.body.avatar; // Ensure you update avatar if it's part of your data
          if(req.body.item) laptop.item = req.body.item;
  
          await laptop.save();
          res.send(laptop);
      } catch (error) {
          res.status(500).send("Server error");
      }
  });
  

    app.listen(4000, () => {
      console.log("Server started at 4000");
    });
  });
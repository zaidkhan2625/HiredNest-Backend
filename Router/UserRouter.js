const express = require("express");
const route = express.Router();
const {
  addAdmin,
  getLead,
  addLead,
  CareerLead,
  getCareerLeads,
  deleteCareerLead,
  updateCareerLead,
} = require("../Controller/usercontroller");
const multer = require("multer");

// Configure multer to store files in memory as buffer
const upload = multer({ storage: multer.memoryStorage() });

route.get("/user", (req, res) => {
  res.send("Hello user, I am here");
});

route.post("/addAdmin", addAdmin);
route.post("/Lead", addLead);
route.get("/Lead", getLead);
route.post("/CareerLead", CareerLead);
route.get("/CareerLead", getCareerLeads);
route.delete("/CareerLead/:id", deleteCareerLead);
route.put('/CareerLead/:id', updateCareerLead);
module.exports = route;

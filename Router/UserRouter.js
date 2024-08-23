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
  addIntrest,
  getareaofintrest,
  deleteareaofintrest,
  updateareaofintrest,
  deleteAllLeads,
} = require("../Controller/usercontroller");
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure multer to store files in memory as buffer

route.get("/user", (req, res) => {
  res.send("Hello user, I am here");
});

route.post("/addAdmin", addAdmin);
route.post("/Lead", addLead);
route.get("/Lead", getLead);

route.delete("/Lead", deleteAllLeads);

route.post("/CareerLead",upload.single('Image'), CareerLead);
route.get("/CareerLead", getCareerLeads);
route.delete("/CareerLead/:id", deleteCareerLead);
route.put('/CareerLead/:id',upload.single('Image'), updateCareerLead);
route.post("/areaofintres",addIntrest);
route.get("/areaofintres",getareaofintrest);
route.delete("/areaofintres/:id", deleteareaofintrest);
route.put("/areaofintres/:id", updateareaofintrest                        );

module.exports = route;

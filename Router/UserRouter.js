const express = require("express");
const route = express.Router();
const {
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
  addjobapplication,
  updatejobapplication,
  deltejobapplication,
  getjobApplication,
  getjobinary,
  addAdmin,
  loginAdmin,
} = require("../Controller/usercontroller");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure multer to store files in memory as buffer

route.get("/user", (req, res) => {
  res.send("Hello user, I am here");
});

route.post("/Lead", addLead);
route.get("/Lead", getLead);

route.delete("/Lead", deleteAllLeads);
route.post("/newAdmin", addAdmin);
route.post('/loginAdmin', loginAdmin);
route.post("/CareerLead", upload.single("Image"), CareerLead);
route.get("/CareerLead", getCareerLeads);
route.delete("/CareerLead/:id", deleteCareerLead);
route.put("/CareerLead/:id", upload.single("Image"), updateCareerLead);
route.post("/areaofintres", addIntrest);
route.get("/areaofintres", getareaofintrest);
route.delete("/areaofintres/:id", deleteareaofintrest);
route.put("/areaofintres/:id", updateareaofintrest);
route.post("/jobapplication", upload.single("resume"), addjobapplication);
route.put("/jobapplication/:id", upload.single("resume"), updatejobapplication);
route.delete("/jobapplication/:id", deltejobapplication);
route.get("/jobapplication", getjobApplication);
route.get("/jobapplication/:id/resume", getjobinary);

module.exports = route;

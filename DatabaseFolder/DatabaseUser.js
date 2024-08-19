const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
  password: String,
  Email: { type: String, unique: true },
});
const lead = new mongoose.Schema({
  Name: String,
  Email: { type: String},
  Number: Number,
  AreaOfInterest: String,
  Message: String

});

const CareerLead = new mongoose.Schema({
  Date: { type: Date, required: true },
  JobDescription: { type: String, required: true },
  Location: { type: String, required: true },
  Description: { type: String, required: true },
  RequiredSkill: { type: String, required: true },
});
const newAdmin = mongoose.model("Admin", Admin);
const newLeads = mongoose.model("Lead",lead);
const newCareerLead = mongoose.model("CareerLead",CareerLead);
module.exports = { newAdmin  ,newLeads, newCareerLead};



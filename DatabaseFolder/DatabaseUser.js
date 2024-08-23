const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
  password: String,
  Email: { type: String, unique: true },
});
const lead = new mongoose.Schema({
  Date: { type: Date, required: true },
  Name: String,
  Email: { type: String},
  Number: Number,
  AreaOfInterest: String,
  Message: String

});
const AreaOfIntrest = new mongoose.Schema({
  Intrest:String
})
const CareerLead = new mongoose.Schema({
  Date: { type: Date, required: true },
  JobDescription: { type: String, required: true },
  Location: { type: String, required: true },
  Description: { type: String, required: true },
  RequiredSkill: { type: String, required: true },
  ImageUrl: { type: String }, // New field for the image URL
});

const newAdmin = mongoose.model("Admin", Admin);
const newLeads = mongoose.model("Lead",lead);
const newCareerLead = mongoose.model("CareerLead",CareerLead);
const newAreaOfInterest = mongoose.model("areaofIntrest" ,AreaOfIntrest);
module.exports = { newAdmin  ,newLeads, newCareerLead,newAreaOfInterest};



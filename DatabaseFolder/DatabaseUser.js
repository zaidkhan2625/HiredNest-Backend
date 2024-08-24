const mongoose = require("mongoose");
const Admin=  new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
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
const JobApplication= new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: Buffer, // Storing the file as binary data
    required: true,
  },
  resumeMimeType: {
    type: String, // Storing the MIME type of the file (e.g., application/pdf)
    required: true,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});


const newAdmin = mongoose.model("Admin", Admin);
const newLeads = mongoose.model("Lead",lead);
const newCareerLead = mongoose.model("CareerLead",CareerLead);
const newAreaOfInterest = mongoose.model("areaofIntrest" ,AreaOfIntrest);
const newJobApplication =mongoose.model("jobapplicationdata",JobApplication);
module.exports = { newAdmin  ,newLeads, newCareerLead,newAreaOfInterest,newJobApplication};



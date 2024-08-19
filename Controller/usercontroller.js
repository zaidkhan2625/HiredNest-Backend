const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  newAdmin,
  newLeads,
  newCareerLead,
} = require("../DatabaseFolder/DatabaseUser");
const multer = require("multer");

// Configure multer to store files in memory as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addAdmin = async (req, res) => {
  const { Email, password } = req.body;
  try {
    const userExists = await newAdmin.findOne({ Email });
    if (userExists) {
      res.send("Email already exists");
    } else if (Email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await newAdmin.create({ Email, password: hashedPassword });
      res.send("Admin added successfully");
    } else {
      res.send("Incomplete data provided");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const addLead = async (req, res) => {
  const { Name, Email, Number, AreaOfInterest, Message } = req.body;
  try {
    if (Email && Name && Number && AreaOfInterest && Message) {
      await newLeads.create({ Name, Email, Number, AreaOfInterest, Message });
      res.send("Lead added successfully");
    } else {
      res.send("Incomplete data provided");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getLead = async (req, res) => {
  try {
    const leads = await newLeads.find();
    if (!leads.length) {
      return res.status(404).json({ message: "No leads found" });
    }
    res.json(leads);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const CareerLead = async (req, res) => {
  const { Date, JobDescription, Location, Description, RequiredSkill } =
    req.body;

  try {
    if (Date && JobDescription && Location && Description && RequiredSkill) {
      await newCareerLead.create({
        Date,
        JobDescription,
        Location,
        Description,
        RequiredSkill,
      });
      res.send("Career lead added successfully");
    } else {
      res.send("Incomplete data provided");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getCareerLeads = async (req, res) => {
  try {
    const careerLeads = await newCareerLead.find({});
    res.json(careerLeads);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const deleteCareerLead = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCareerLead = await newCareerLead.findByIdAndDelete(id);

    if (!deletedCareerLead) {
      return res.status(404).send("Career lead not found");
    }

    res.send("Career lead deleted successfully");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const updateCareerLead = async (req, res) => {
  const { id } = req.params;
  const { Date, JobDescription, Location, Description, RequiredSkill } = req.body;

  try {
    const updatedLead = await newCareerLead.findByIdAndUpdate(
      id,
      { Date, JobDescription, Location, Description, RequiredSkill },
      { new: true } // This option returns the updated document
    );

    if (updatedLead) {
      res.json({ message: "Career lead updated successfully", data: updatedLead });
    } else {
      res.status(404).json({ message: "Career lead not found" });
    }
  } catch (error) {
    console.error("Error updating career lead:", error.message);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = { addAdmin, addLead, getLead, CareerLead, getCareerLeads,updateCareerLead ,deleteCareerLead};

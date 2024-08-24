const jwt = require("jsonwebtoken");
const express = require('express');
const bcrypt = require("bcryptjs");
const {
  newAdmin,
  newLeads,
  newCareerLead,
 
  newAreaOfInterest,
  newJobApplication,
} = require("../DatabaseFolder/DatabaseUser");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "djnccikqw",
  api_key: "813486327331655",
  api_secret: "dvVETNhYz7WS9MVj65-Ar6o3qoA",
});
const uploadImage = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "career_leads" }, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      })
      .end(imageBuffer);
  });
};
// Configure multer to store files in memory as buffer
const storage = multer.memoryStorage();
const addAdmin = async (req, res) => {
  try {
    const { Email, password } = req.body;
    console.log(Email , password);
    if (!Email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the email already exists
    const existingAdmin = await newAdmin.findOne({ Email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password for debugging (remove in production)
    console.log('Hashed Password:', hashedPassword);

    // Create a new admin
    const admin = new newAdmin({
      Email,
      password: hashedPassword
    });

    await admin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error in addAdmin function:', error); // Log the error with more context
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { Email, password } = req.body;
    if (!Email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await newAdmin.findOne({ Email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = jwt.sign(
      { adminId: admin._id },
      'your_jwt_secret_key', // Replace with your secret key
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in loginAdmin function:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const addLead = async (req, res) => {
  const { Name, Email, Number, AreaOfInterest, Message, Date } = req.body;
  try {
    if (Email && Name && Number && AreaOfInterest && Message && Date) {
      await newLeads.create({
        Name,
        Email,
        Number,
        AreaOfInterest,
        Message,
        Date,
      });
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
const deleteAllLeads = async (req, res) => {
  try {
    const result = await newLeads.deleteMany(); // Delete all documents from the collection

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No leads found to delete" });
    }

    res.json({ message: "All leads deleted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const CareerLead = async (req, res) => {
  const { Date, JobDescription, Location, Description, RequiredSkill } =
    req.body;
  const Image = req.file; // Access uploaded file

  console.log("Received data:", {
    Date,
    JobDescription,
    Location,
    Description,
    RequiredSkill,
    Image: Image ? "Image uploaded" : "No image",
  });

  try {
    let imageUrl = "";

    if (Image) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "career_leads" }, (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result.secure_url);
          })
          .end(Image.buffer);
      });

      imageUrl = uploadResult;
    }

    if (Date && JobDescription && Location && Description && RequiredSkill) {
      await newCareerLead.create({
        Date,
        JobDescription,
        Location,
        Description,
        RequiredSkill,
        ImageUrl: imageUrl,
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
  const { Date, JobDescription, Location, Description, RequiredSkill } =
    req.body;
  const Image = req.file; // Access uploaded file

  console.log("Received data for update:", {
    Date,
    JobDescription,
    Location,
    Description,
    RequiredSkill,
    Image: Image ? "Image uploaded" : "No image",
  });

  try {
    // Check if the lead exists
    const existingLead = await newCareerLead.findById(id);
    if (!existingLead) {
      return res.status(404).json({ message: "Career lead not found" });
    }

    let imageUrl = existingLead.ImageUrl; // Keep existing image URL if no new image is provided

    // If a new image is provided, upload it to Cloudinary
    if (Image) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "career_leads" }, (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result.secure_url);
          })
          .end(Image.buffer);
      });

      imageUrl = uploadResult;
    }

    // Update the lead with the provided fields
    const updatedLead = await newCareerLead.findByIdAndUpdate(
      id,
      {
        Date,
        JobDescription,
        Location,
        Description,
        RequiredSkill,
        ImageUrl: imageUrl, // Update with the new or existing image URL
      },
      { new: true } // This option returns the updated document
    );

    res.json({
      message: "Career lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error updating career lead:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const addIntrest = async (req, res) => {
  console.log("Request Body:", req.body); // Add this line for debugging
  const { Intrest } = req.body;
  try {
    if (Intrest) {
      await newAreaOfInterest.create({ Intrest });
      res.status(200).send("Lead added successfully");
    } else {
      res.status(400).send("Incomplete data provided");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const getareaofintrest = async (req, res) => {
  try {
    const leads = await newAreaOfInterest.find();
    if (!leads.length) {
      return res.status(404).json({ message: "No leads found" });
    }
    res.json(leads);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const deleteareaofintrest = async (req, res) => {
  const { id } = req.params;

  // Validate the ID format (optional but recommended)
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    // Assuming `newAreaOfInterest` is your Mongoose model
    const deletedCareerLead = await newAreaOfInterest.findByIdAndDelete(id);

    if (!deletedCareerLead) {
      return res.status(404).send("Career lead not found");
    }

    res.send("Career lead deleted successfully");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const updateareaofintrest = async (req, res) => {
  const { id } = req.params;
  const { Intrest } = req.body;

  try {
    const updatedLead = await newAreaOfInterest.findByIdAndUpdate(
      id,
      { Intrest },
      { new: true } // This option returns the updated document
    );

    if (updatedLead) {
      res.json({
        message: "Career lead updated successfully",
        data: updatedLead,
      });
    } else {
      res.status(404).json({ message: "Career lead not found" });
    }
  } catch (error) {
    console.error("Error updating career lead:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const addjobapplication = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    const resume = req.file.buffer; // The PDF file data
    const resumeMimeType = req.file.mimetype;

    const newApplication = new newJobApplication({
      fullName,
      email,
      phone,
      resume,
      resumeMimeType,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error saving application", error });
    console.log(error.message);
  }
};
const updatejobapplication = async (req, res) => {
  try {
    const updatedData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
    };

    if (req.file) {
      updatedData.resume = req.file.buffer;
      updatedData.resumeMimeType = req.file.mimetype;
    }

    const updatedApplication = await newJobApplication.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error });
  }
};
const deltejobapplication = async (req, res) => {
  try {
    await newJobApplication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application", error });
  }
};
const getjobApplication = async (req, res) => {
  try {
    const leads = await newJobApplication.find();
    if (!leads.length) {
      return res.status(404).json({ message: "No leads found" });
    }
    res.json(leads);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const getjobinary = async (req, res) => {
  try {
    const jobApplication = await newJobApplication.findById(req.params.id);
    if (!jobApplication || !jobApplication.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Set the content type for the PDF
    res.setHeader("Content-Type", jobApplication.resumeMimeType);
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');

    // Send the resume binary data
    res.send(Buffer.from(jobApplication.resume, "base64"));
  } catch (error) {
    console.error("Error downloading resume:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addAdmin,
  addLead,
  getLead,
  CareerLead,
  getCareerLeads,
  updateCareerLead,
  deleteCareerLead,
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
  loginAdmin
};

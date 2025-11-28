// controllers/lifememberControllers.js
const xlsx = require('xlsx');
const Record = require('../models/lifememberXsluploadModel');
const UploadedXslFile = require('../models/lifememberXsluploadModel');
const fs = require('fs');

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'An error occurred while fetching the records', error });
  }
};

const uploadExcel = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body to debug

    if (!req.body.chapters) {
      return res.status(400).json({ error: 'Missing chapters in request body' });
    }

    const chaptersData = req.body.chapters.map(lifeMember => ({
      id: lifeMember.id,
      name: lifeMember.name,
      address: lifeMember.address,
      state: lifeMember.state,
      status: lifeMember.status,
      phone: lifeMember.phone,
      email: lifeMember.email,
    }));

    console.log('Chapters Data:', chaptersData);

    await UploadedXslFile.insertMany(chaptersData);
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data to DB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createLifeMember = async (req, res) => {
  try {
    // fetch data
    const { id, name, email, address, state, status, phone } = req.body;

    // validation
    if (!id || !name || !email || !phone || !address || !state || !status) {
      return res.status(400).json({
        success: false,
        message: "all fields required"
      })
    }

    // create new member object
    const newLifeMember = {
      id,
      name,
      state,
      address,
      phone,
      email,
      status
    }

    // save into db
    const savedLifeMember = await UploadedXslFile.create(newLifeMember);

    return res.status(201).json({
      success: true,
      message: "successfully created life member",
      data: savedLifeMember
    })

  } catch (error) {
    console.error("getting an error while creating life member", error.message);
    return res.status(500).json({
      success: false,
      message: "getting an error while creating life member",
      error: error.message
    })
  }
}
const getData = async (req, res) => {
  try {
    const lifeMembers = await UploadedXslFile.find({}).sort({ createdAt: -1 });
    res.status(200).json(lifeMembers);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, ...updatedData } = req.body;
    if (email) {
      const existing = await UploadedXslFile.findOne({ email, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ message: 'Email already exists for another member' });
      }
    }
    const member = await UploadedXslFile.findByIdAndUpdate(id, updatedData, { new: true });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ message: 'Error updating member data' });
  }
};

const deleteLifeMemberById = async (req, res) => {
  try {
    // fetch id 
    const { id } = req.params;
    // validation
    const existingMember = await UploadedXslFile.findByIdAndDelete(id);
    if (!existingMember) {
      return res.status(400).json({
        success: false,
        message: "User Not Found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "member deleted successfully from database",
      data: existingMember
    })
  } catch (error) {
    console.error("getting an while deleting Ordinary Member", error);
    return res.status(500).json({
      success: false,
      message: "getting an while deleting Ordinary Member",
      error: error.message,
    })
  }
}
module.exports = { getAllRecords, uploadExcel, getData, updateMember, createLifeMember, deleteLifeMemberById };

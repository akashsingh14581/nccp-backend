const xlsx = require('xlsx');
const Record = require('../models/uploadModels');
const UploadedXslFile = require('../models/uploadModels');
const fs = require('fs');

const getfellowmemberAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'An error occurred while fetching the records', error });
  }
};

const createLifeFellowMember = async (req, res) => {
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
    const newLifeFellowMember = {
      id,
      name,
      state,
      address,
      phone,
      email,
      status
    }

    // save into db
    const savedLifeFellowMember = await UploadedXslFile.create(newLifeFellowMember);

    return res.status(201).json({
      success: true,
      message: "successfully created life fellow member",
      data: savedLifeFellowMember
    })

  } catch (error) {
    console.error("getting an error while creating life fellow member", error.message);
    return res.status(500).json({
      success: false,
      message: "getting an error while creating life fellow member",
      error: error.message
    })
  }
}
const uploadfellowmemberExcel = async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    if (!req.body.chapters) {
      return res.status(400).json({ error: 'Missing chapters in request body' });
    }

    const fellowmemberData = req.body.chapters.map(lifeMember => ({
      id: lifeMember.id,
      name: lifeMember.name,
      address: lifeMember.address,
      state: lifeMember.state,
      status: lifeMember.status,
      phone: lifeMember.phone,
      email: lifeMember.email,
    }));

    console.log('Chapters Data:', fellowmemberData);

    await UploadedXslFile.insertMany(fellowmemberData);
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data to DB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getfellowData = async (req, res) => {
  try {
    const lifeMembers = await UploadedXslFile.find({}).sort({ createdAt: -1 });
    res.status(200).json(lifeMembers);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
};


// A added

const editUploadedFellowMembers = async (req, res) => {
  try {
    const { id } = req.params; // Frontend se member id aayegi
    if (!id) {
      return res.status(400).json({ error: 'Member ID is required' });
    }

    // Update data (without overwriting whole doc)
    const updateFields = {
      name: req.body.name,
      address: req.body.address,
      state: req.body.state,
      status: req.body.status,
      phone: req.body.phone,
      email: req.body.email,
    };

    const updatedMember = await UploadedXslFile.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true } // updated doc return kare
    );

    if (!updatedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json({
      message: 'Member updated successfully',
      data: updatedMember
    });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteuploadFellowMembers = async (req, res) => {
  try {
    const { id } = req.params; // URL se id aayegi

    if (!id) {
      return res.status(400).json({ error: 'Member ID is required' });
    }

    const deletedMember = await UploadedXslFile.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json({
      message: 'Member deleted successfully',
      deletedData: deletedMember,
    });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { getfellowmemberAllRecords, uploadfellowmemberExcel, getfellowData, editUploadedFellowMembers, deleteuploadFellowMembers, createLifeFellowMember };

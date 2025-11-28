const PresidentAndSecretary = require('../models/presidentAndSecrataryModel');

// ✅ Add new record (Create)
exports.createRecord = async (req, res) => {
  try {
    const { year, president, secretary } = req.body;

    if (!year || !president || !secretary) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRecord = new PresidentAndSecretary({ year, president, secretary });
    const savedRecord = await newRecord.save();

    res.status(201).json({
      message: 'Record created successfully',
      data: savedRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get all records (Read)
exports.getAllRecords = async (req, res) => {
  try {
    const records = await PresidentAndSecretary.find().sort({ year: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get single record by ID
exports.getRecordById = async (req, res) => {
  try {
    const record = await PresidentAndSecretary.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Update record by ID
exports.updateRecord = async (req, res) => {
  try {
    const { year, president, secretary } = req.body;

    const updatedRecord = await PresidentAndSecretary.findByIdAndUpdate(
      req.params.id,
      { year, president, secretary },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({
      message: 'Record updated successfully',
      data: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Delete record by ID
exports.deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await PresidentAndSecretary.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Upload Excel Data for President & Secretary Members
exports.uploadPresidentSecretaryExcel = async (req, res) => {
    try {
        let records = req.body.records;

        // Agar single object bheja gaya ho to usko array bana do
        if (!Array.isArray(records)) {
            records = [records];
        }

        if (!records || records.length === 0) {
            return res.status(400).json({ error: 'Missing or invalid records in request body' });
        }

        // Validate required fields
        const invalidRecords = records.filter(record => 
            !record.year || !record.president || !record.secretary
        );

        if (invalidRecords.length > 0) {
            return res.status(400).json({ 
                error: 'Missing required fields (year, president, secretary) in some records',
                invalidCount: invalidRecords.length
            });
        }

        const presidentSecretaryData = records.map(record => ({
            year: record.year,
            president: record.president,
            secretary: record.secretary,
            // Optional fields - include if provided
            presidentEmail: record.presidentEmail || '',
            presidentPhone: record.presidentPhone || '',
            secretaryEmail: record.secretaryEmail || '',
            secretaryPhone: record.secretaryPhone || '',
        }));

        await PresidentAndSecretary.insertMany(presidentSecretaryData);
        res.status(200).json({ 
            message: 'President & Secretary data saved successfully',
            recordsCount: presidentSecretaryData.length
        });
    } catch (error) {
        console.error('Error saving President & Secretary data to DB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
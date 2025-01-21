const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  const { issueType, description, location } = req.body;
  try {
    const report = await Report.create({
      userId: req.user._id,
      issueType,
      description,
      location,
      status: 'Open', // Ensure the status is set to 'Open'
    });
    res.status(201).json({
      _id: report._id,
      userId: report.userId,
      issueType: report.issueType,
      description: report.description,
      location: report.location,
      status: report.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
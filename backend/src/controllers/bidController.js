const Bid = require('../models/Bid');

exports.createBid = async (req, res) => {
    const { reportId, bidAmount } = req.body;
    try {
        const bid = await Bid.create({
        reportId,
        solverId: req.user._id,
        bidAmount,
        });
        res.status(201).json(bid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    exports.getBids = async (req, res) => {
    try {
        const bids = await Bid.find({ reportId: req.params.reportId });
        res.json(bids);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    exports.updateBidStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const bid = await Bid.findByIdAndUpdate(id, { status }, { new: true });
        res.json(bid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
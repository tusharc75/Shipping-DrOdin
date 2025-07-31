// const router = require('express').Router();
// let Selection = require('../models/selection.model');

// router.route('/').get((req, res) => {
//   Selection.find()
//     .then(selections => res.json(selections))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//   const { vendorName, providerName, total, date } = req.body;

//   const newSelection = new Selection({
//     vendorName,
//     providerName,
//     total,
//     date,
//   });

//   newSelection.save()
//     .then(() => res.json({ success: true, data: newSelection, message: 'Selection added!' }))
//     .catch(err => res.status(400).json({ success: false, error: 'Error: ' + err }));
// });

// module.exports = router;




const router = require('express').Router();
const mongoose = require('mongoose');

// Selection Schema
const selectionSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    trim: true
  },
  providerName: {
    type: String,
    required: true,
    trim: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Selection = mongoose.model('Selection', selectionSchema);

// GET all selections
router.route('/').get(async (req, res) => {
  try {
    const selections = await Selection.find().sort({ createdAt: -1 });
    res.json({ success: true, data: selections });
  } catch (error) {
    console.error('Get selections error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST add new selection
router.route('/add').post(async (req, res) => {
  try {
    const { vendorName, providerName, total, date } = req.body;
    
    // Validation
    if (!vendorName || !providerName || !total || !date) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required: vendorName, providerName, total, date' 
      });
    }
    
    if (typeof total !== 'number' || total < 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Total must be a non-negative number' 
      });
    }
    
    const newSelection = new Selection({
      vendorName: vendorName.trim(),
      providerName: providerName.trim(),
      total: parseFloat(total),
      date: date
    });
    
    const savedSelection = await newSelection.save();
    console.log('Selection saved:', savedSelection);
    
    res.json({ 
      success: true, 
      data: savedSelection,
      message: 'Selection saved successfully' 
    });
  } catch (error) {
    console.error('Add selection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET selections by date range
router.route('/range').get(async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const selections = await Selection.find(query).sort({ date: -1 });
    res.json({ success: true, data: selections });
  } catch (error) {
    console.error('Get selections by range error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE selection by ID
router.route('/:id').delete(async (req, res) => {
  try {
    const deletedSelection = await Selection.findByIdAndDelete(req.params.id);
    
    if (!deletedSelection) {
      return res.status(404).json({ success: false, error: 'Selection not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Selection deleted successfully',
      data: deletedSelection 
    });
  } catch (error) {
    console.error('Delete selection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
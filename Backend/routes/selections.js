const router = require('express').Router();
let Selection = require('../models/selection.model');

router.route('/').get((req, res) => {
  Selection.find()
    .then(selections => res.json(selections))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { vendorName, providerName, total, date } = req.body;

  const newSelection = new Selection({
    vendorName,
    providerName,
    total,
    date,
  });

  newSelection.save()
    .then(() => res.json({ success: true, data: newSelection, message: 'Selection added!' }))
    .catch(err => res.status(400).json({ success: false, error: 'Error: ' + err }));
});

module.exports = router;

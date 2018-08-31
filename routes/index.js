const express = require('express');
const router = express.Router();
const eb = require('../lib/ebbinghaus');

router.get('/eb', function (req, res, next) {
  res.json(eb.createPlanList(5, 10));
});

module.exports = router;

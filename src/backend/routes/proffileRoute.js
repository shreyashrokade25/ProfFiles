const express = require('express');
const router = express.Router();
const proffileController = require('../controllers/proffileController');

router.post('/save-proffile', proffileController.saveProffile);

module.exports = router;
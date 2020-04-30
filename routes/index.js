const express = require('express');


const router = express.Router();
const entryController = require('../controllers/entryController');


router.get('/', entryController.displayEntries);

router.post('/add', entryController.addEntry);
router.post('/add/:id', entryController.updateEntry);

router.get('/edit/:id', entryController.editEntry);
router.post('/entry/:id/delete', entryController.deleteEntry);

router.post('/entry/:id/complete',entryController.toggleTaskStatus);

module.exports = router;

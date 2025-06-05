const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

// Our routes
router.get('/library/:user_id', libraryController.getLibrary);
router.post('/soundtracks', libraryController.addToLibrary);
router.delete('/soundtracks', libraryController.deleteFromLibrary);

module.exports = router;
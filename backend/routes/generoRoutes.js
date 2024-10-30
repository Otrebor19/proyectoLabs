// routes/generoRoutes.js
const express = require('express');
const router = express.Router();
const { getGeneros } = require('../controllers/generoController');

router.get('/generos', getGeneros);

module.exports = router;

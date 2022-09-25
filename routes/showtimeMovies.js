const express = require('express');
const router = express.Router();
const showtimeMovies = require('../services/showtimeMovies');


router.post('/', async function(req, res, next) {
  try {
    res.json(await showtimeMovies.create(req.body));
  } catch (err) {
    console.error(`Error while creating movies `, err.message);
    next(err);
  }
});

module.exports = router;
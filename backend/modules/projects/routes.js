const express = require('express');
const router = express.Router();

router.get('/projects', (req, res) => {
  res.json({ message: 'This is the projects module' });
});

module.exports = router;

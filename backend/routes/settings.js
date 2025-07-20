const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Get company settings
router.get('/', async (req, res) => {
  try {
    const settings = await pool.query('SELECT * FROM company_settings ORDER BY id LIMIT 1');
    res.json(settings.rows[0] || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update company settings
router.post('/', async (req, res) => {
    const { name, logo_url, primary_color } = req.body;
    try {
        // Use an "upsert" logic: update if exists, insert if not
        const settings = await pool.query(
            `INSERT INTO company_settings (id, name, logo_url, primary_color)
             VALUES (1, $1, $2, $3)
             ON CONFLICT (id) DO UPDATE
             SET name = $1, logo_url = $2, primary_color = $3
             RETURNING *`,
            [name, logo_url, primary_color]
        );
        res.json(settings.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

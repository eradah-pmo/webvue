const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await pool.query('SELECT * FROM roles');
    res.json(roles.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new role
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newRole = await pool.query(
            'INSERT INTO roles (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(201).json(newRole.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all permissions for a role
router.get('/:roleId/permissions', async (req, res) => {
    const { roleId } = req.params;
    try {
        const permissions = await pool.query(
            'SELECT p.id, p.name FROM permissions p JOIN role_permissions rp ON p.id = rp.permission_id WHERE rp.role_id = $1',
            [roleId]
        );
        res.json(permissions.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a permission to a role
router.post('/:roleId/permissions', async (req, res) => {
    const { roleId } = req.params;
    const { permissionId } = req.body;
    try {
        await pool.query(
            'INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)',
            [roleId, permissionId]
        );
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

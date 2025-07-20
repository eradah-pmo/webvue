import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout.jsx';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/roles');
        setRoles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoles();
  }, []);

  const handleCreateRole = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/roles', { name: newRoleName });
      setRoles([...roles, res.data]);
      setNewRoleName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1>Role Management</h1>
      <form onSubmit={handleCreateRole}>
        <input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder="New role name"
          required
        />
        <button type="submit">Create Role</button>
      </form>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default RoleManagement;

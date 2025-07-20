import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout.jsx';

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);

  // In a real application, you would have an endpoint to list available and active modules.
  // For this example, we will just hardcode the projects module.
  useEffect(() => {
    setModules(['projects']);
  }, []);

  return (
    <Layout>
      <h1>Module Management</h1>
      <ul>
        {modules.map((module) => (
          <li key={module}>{module}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default ModuleManagement;

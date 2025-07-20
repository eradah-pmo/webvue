import React from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';

const SystemSettings = () => {
  const handleBackup = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/system/backup', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `backup-${new Date().toISOString()}.sql`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      alert('Backup failed');
    }
  };

  return (
    <Layout>
      <h1>System Settings</h1>
      <button onClick={handleBackup}>Backup Database</button>
    </Layout>
  );
};

export default SystemSettings;

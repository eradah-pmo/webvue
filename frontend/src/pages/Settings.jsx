import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout.jsx';

const Settings = () => {
  const [settings, setSettings] = useState({
    name: '',
    logo_url: '',
    primary_color: '#ffffff',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/settings');
        if (res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const onChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/settings', settings);
      alert('Settings saved!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1>Company Settings</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={settings.name}
          onChange={onChange}
          placeholder="Company Name"
        />
        <input
          type="text"
          name="logo_url"
          value={settings.logo_url}
          onChange={onChange}
          placeholder="Logo URL"
        />
        <input
          type="color"
          name="primary_color"
          value={settings.primary_color}
          onChange={onChange}
        />
        <button type="submit">Save Settings</button>
      </form>
    </Layout>
  );
};

export default Settings;

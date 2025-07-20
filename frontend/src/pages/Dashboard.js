import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <h1>{t('welcome')}</h1>
    </Layout>
  );
};

export default Dashboard;

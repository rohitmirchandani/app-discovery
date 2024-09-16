// pages/_app.js
import Layout from '@/components/Layout/Layout';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import '../globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout >
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </>
  );
}

export default MyApp;

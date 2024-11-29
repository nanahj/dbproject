import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import User from './pages/User';
import Month from './pages/Month';
import Category from './pages/Category';
import Layout from './components/Layout';
import Header from './components/Header';

function App() {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path="" element={<Main />} />
            <Route path="/User" element={<User />} />
            <Route path="/Month" element={<Month />} />
            <Route path="/Category" element={<Category  />} />
          </Routes>
        </Layout>
    </Router>
  );
}

export default App;
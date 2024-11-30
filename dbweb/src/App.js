import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import User from './pages/User';
import Month from './pages/Month';
import Category from './pages/Category';
import Score from './pages/Score';
import Layout from './components/Layout';
import { ExpensesProvider } from "./components/ExpensesContext";

function App() {
  return (
    <ExpensesProvider>
    <Router>
        <Layout>
          <Routes>
            <Route path="" element={<Main />} />
            <Route path="/User" element={<User />} />
            <Route path="/Month" element={<Month />} />
            <Route path="/Category" element={<Category  />} />
            <Route path="/Score" element={<Score  />} />
          </Routes>
        </Layout>
    </Router>
    </ExpensesProvider>
  );
}

export default App;
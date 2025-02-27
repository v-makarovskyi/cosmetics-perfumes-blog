import React from 'react';
import { RegisterPage } from './pages/register';
import { LoginPage } from './pages/login';
import { Footer } from './layout/footer/footer';



import './main-scss-app.scss'

function App() {
  return (
    <div className="app">
      <LoginPage />
      <Footer />
    </div>
  );
}

export default App;

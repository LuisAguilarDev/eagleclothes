import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/main.scss';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './reducer/context';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <div className="APPCONTAINER">
          <Navigation />
          <App />
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

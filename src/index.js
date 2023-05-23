import React from 'react';
import ReactDOM from 'react-dom/client';
import './res/reset.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './pages/detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* 페이지 이동을 위해 설정해야함 */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

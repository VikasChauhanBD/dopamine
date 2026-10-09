import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/footer/Footer";

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

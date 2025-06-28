import { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/modals/Modal";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element= {<ProjectsPage/>}/>
          
          <Route path="*" element = {<LandingPage/>}/>
        </Routes>

        

        <Footer/>
        
      </BrowserRouter>
    </>
  );
}

export default App;

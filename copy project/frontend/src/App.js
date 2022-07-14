import React from 'react'
import "./App.css"
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Header from './Component/Header'
import Student from "./Component/Student"
import SelectComponent from "./Component/SelectComponent"
import AddStudent from "./Component/AddStudent"

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/select" element={<SelectComponent />} />
      </Routes>
      <AddStudent />
      
    </Router>
  );
}

export default App

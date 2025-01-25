import "./App.css";
import { HashRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Paste from "./components/Paste";
import AddNote from "./components/AddNote";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <HashRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/codes" element={<Paste/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/updatenote" element={<AddNote />} />
          </Routes>
        </div>
      </HashRouter>
    </NoteState>
  );
}
export default App;

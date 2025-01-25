import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyNotes from "./components/MyNotes";
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
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/codes" element={<Paste/>} />
            {/* <Route exact path="/mynotes" element={<MyNotes/>} /> */}
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/updatenote" element={<AddNote />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;

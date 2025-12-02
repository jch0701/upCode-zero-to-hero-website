import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Overview } from "./page/Overview";
import { Roadmap } from "./page/Roadmap";
import { Project } from "./page/Project";
import { Career } from "./page/Career";
import { Profile } from "./page/Profile";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/Overview" element={<Overview />} />
        <Route path="/Roadmap" element={<Roadmap />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/Career" element={<Career />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

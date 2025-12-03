import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Overview } from "./page/Overview";
import { Roadmap } from "./page/Roadmap";
import { RoadmapDetails } from "./page/RoadmapDetails";
import { Project } from "./page/Project";
import { Career } from "./page/Career";
import { Profile } from "./page/Profile";
import { Login } from "./page/Login"
import RootLayout from './layouts/RootLayout';
import { RoadmapChapter } from "./page/RoadmapChapter";


function App() {
  return (
    <>
    <div className="bg-fixed"></div>
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Overview />} />
          <Route path="login" element={<Login />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug" element={<RoadmapDetails />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug" element={<RoadmapChapter />} />
          <Route path="project" element={<Project />} />
          <Route path="career" element={<Career />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

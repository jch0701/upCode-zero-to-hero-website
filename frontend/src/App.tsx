import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Overview } from "./page/Overview";
import { Roadmap } from "./page/Roadmap";
import { RoadmapDetails } from "./page/RoadmapDetails";
import { Project } from "./page/Project";
import { Career } from "./page/Career";
import { Profile } from "./page/Profile";
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
          <Route path="Roadmap" element={<Roadmap />} />
          <Route path="Roadmap/:roadmapID/:roadmapSlug" element={<RoadmapDetails />} />
          <Route path="Roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug" element={<RoadmapChapter />} />
          <Route path="Project" element={<Project />} />
          <Route path="Career" element={<Career />} />
          <Route path="Profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

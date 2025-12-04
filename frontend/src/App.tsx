import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Overview } from "./page/Overview.tsx";
import { Roadmap } from "./page/roadmaps/Roadmap.tsx";
import { RoadmapDetails } from "./page/roadmaps/RoadmapDetails.tsx";
import { Project } from "./page/projects/Project.tsx";
import { Career } from "./page/Career.tsx";
import { Profile } from "./page/Profile.tsx";
import { Login } from "./page/Login.tsx";
import { ProjectDetails } from "./page/projects/ProjectDetails.tsx";
import RootLayout from './layouts/RootLayout.tsx';
import { RoadmapChapter } from "./page/roadmaps/RoadmapChapter.tsx";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Overview />} />
          <Route path="login" element={<Login />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug" element={<RoadmapDetails />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug" element={<RoadmapChapter />} />
          <Route path="project" element={<Project />} />
          <Route path="project/:projectId" element={<ProjectDetails />} />
          <Route path="career" element={<Career />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App;

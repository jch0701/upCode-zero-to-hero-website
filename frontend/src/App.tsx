import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Overview } from "./page/Overview.tsx";
import { Roadmap } from "./page/Roadmap.tsx";
import { RoadmapDetails } from "./page/RoadmapDetails.tsx";
import { Project } from "./page/Project.tsx";
import { Career } from "./page/Career.tsx";
import { Profile } from "./page/Profile.tsx";
import RootLayout from './layouts/RootLayout.tsx';
import { RoadmapChapter } from "./page/RoadmapChapter.tsx";


function App() {
  console.log("App component rendered");
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Overview />} />
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

export default App;

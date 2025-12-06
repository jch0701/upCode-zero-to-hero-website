import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import { Overview } from "./page/Overview.tsx";
import { Roadmap } from "./page/roadmaps/Roadmap.tsx";
import { RoadmapDetails } from "./page/roadmaps/RoadmapDetails.tsx";
import { Project } from "./page/projects/Project.tsx";
import { Career } from "./page/Career.tsx";
import { Profile } from "./page/profile/Profile.tsx";
import  Login_Pg  from "./page/signuplogin/Login_Pg.tsx";
import Signup_Pg from "./page/signuplogin/Signup_Pg.tsx";
import ForgotPassword_Pg from "./page/signuplogin/ForgotPassword_Pg.tsx";
import ResetPassword_Pg from "./page/signuplogin/ResetPassword_Pg.tsx";
import { ProjectDetails } from "./page/projects/ProjectDetails.tsx";
import { MyProjects } from "./page/projects/MyProjects.tsx";
import RootLayout from './layouts/RootLayout.tsx';
import { ChapterDetails} from "./page/roadmaps/ChapterDetails.tsx";
import { EditRoadmap } from "./page/roadmaps/EditRoadmap.tsx";
import { EditNode } from "./page/roadmaps/EditNode.tsx";
import { EditChapter } from "./page/roadmaps/EditChapter.tsx";
import { AddRoadmap } from "./page/roadmaps/AddRoadmap.tsx";
import SubmissionDetails from "./page/projects/submissions/SubmissionDetails.tsx";
import { AddChapter } from "./page/roadmaps/AddChapter.tsx";
import { AddNode } from "./page/roadmaps/AddNode.tsx";


function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Overview />} />
          <Route path="login" element={<Login_Pg />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="roadmap/add-roadmap" element={<AddRoadmap/>} />
          <Route path="roadmap/:roadmapID/:roadmapSlug" element={<RoadmapDetails />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/edit" element={<EditRoadmap/>} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/add-chapter" element={<AddChapter />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug" element={<ChapterDetails />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/edit" element={<EditChapter />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/add-node" element={<AddNode />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/:nodeID/edit" element={<EditNode />} />
          <Route path="project" element={<Project />} />
          <Route path="project/:projectId" element={<ProjectDetails />} />
          <Route path="project/myProjects" element={<MyProjects />} />
          <Route path="project/submission/:submissionId" element={<SubmissionDetails />} />
          <Route path="career" element={<Career />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Signup_Pg />} />
          <Route path="forgot-password" element={<ForgotPassword_Pg />} />
          <Route path="reset-password" element={<ResetPassword_Pg />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/add-node" element={<AddNode />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/:nodeID/edit" element={<EditNode />} />
        </Routes>
      )}
    </>
  );
}


function App() {
  return (
    <>
    <Router>
      <AppRoutes />
    </Router>
    </>
  )
}

export default App;

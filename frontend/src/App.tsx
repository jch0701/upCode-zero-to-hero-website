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
import { RoadmapChapter } from "./page/roadmaps/RoadmapChapter.tsx";
import { RoadmapDetailEdit } from "./page/roadmaps/RoadmapDetailEdit.tsx";
import { RoadmapChapterNode } from "./page/roadmaps/RoadmapChapterNode.tsx";
import { RoadmapChapterEdit } from "./page/roadmaps/RoadmapChapterEdit.tsx";


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
          <Route path="roadmap/:roadmapID/:roadmapSlug" element={<RoadmapDetails />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/edit" element={<RoadmapDetailEdit/>} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug" element={<RoadmapChapter />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/edit" element={<RoadmapChapterEdit />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/:nodeID/edit" element={<RoadmapChapterNode />} />
          <Route path="project" element={<Project />} />
          <Route path="project/:projectId" element={<ProjectDetails />} />
          <Route path="project/myProjects" element={<MyProjects />} />
          <Route path="career" element={<Career />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Signup_Pg />} />
          <Route path="forgot-password" element={<ForgotPassword_Pg />} />
          <Route path="reset-password" element={<ResetPassword_Pg />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug/:nodeID/edit" 
                 element={
                  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-pink-300/70 w-full max-w-2xl rounded-xl shadow-2xl p-6">
                        <RoadmapChapterNode />
                    </div>
                  </div>
                 } />
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

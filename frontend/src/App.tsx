import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Overview } from "./page/Overview.tsx";
import { Roadmap } from "./page/Roadmap.tsx";
import { RoadmapDetails } from "./page/RoadmapDetails.tsx";
import { Project } from "./page/Project.tsx";
import { Career } from "./page/Career.tsx";
import { Profile } from "./page/Profile.tsx";
import  Login_Pg  from "./page/Login_Pg.tsx";
import Signup_Pg from "./page/Signup_Pg.tsx";
import ForgotPassword_Pg from "./page/ForgotPassword_Pg.tsx";
import ResetPassword_Pg from "./page/ResetPassword_Pg.tsx";
import RootLayout from './layouts/RootLayout.tsx';
import { RoadmapChapter } from "./page/RoadmapChapter.tsx";
import { RoadmapDetailEdit } from "./page/RoadmapDetailEdit.tsx";


function App() {
  console.log("App component rendered");
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Overview />} />
          <Route path="login" element={<Login_Pg />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug" element={<RoadmapDetails />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/:chapterID/:chapterSlug" element={<RoadmapChapter />} />
          <Route path="roadmap/:roadmapID/:roadmapSlug/edit" element={<RoadmapDetailEdit/>} />
          <Route path="project" element={<Project />} />
          <Route path="career" element={<Career />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Signup_Pg />} />
          <Route path="forgot-password" element={<ForgotPassword_Pg />} />
          <Route path="reset-password" element={<ResetPassword_Pg />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App;

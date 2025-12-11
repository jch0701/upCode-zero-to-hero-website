import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Overview } from "./page/Overview";
import { Roadmap } from "./page/roadmaps/Roadmap";
import { RoadmapDetails } from "./page/roadmaps/RoadmapDetails";
import { Project } from "./page/projects/Project";
import { Career } from "./page/career/Career";
import { All } from "./page/profile/All";
import Login_Pg from "./page/signuplogin/Login_Pg";
import Signup_Pg from "./page/signuplogin/Signup_Pg";
import ForgotPassword_Pg from "./page/signuplogin/ForgotPassword_Pg";
import ResetPassword_Pg from "./page/signuplogin/ResetPassword_Pg";
import { ProjectDetails } from "./page/projects/ProjectDetails";
import { MyProjects } from "./page/projects/MyProjects";
import RootLayout from "./layouts/RootLayout";
import { ChapterDetails } from "./page/roadmaps/ChapterDetails";
import { EditRoadmap } from "./page/roadmaps/EditRoadmap";
import { EditNode } from "./page/roadmaps/EditNode";
import { ErrorBoundary } from "./page/ErrorBoundary";
import { EditChapter } from "./page/roadmaps/EditChapter";
import { AddRoadmap } from "./page/roadmaps/AddRoadmap";
import SubmissionDetails from "./page/projects/SubmissionDetails";
import { AddChapter } from "./page/roadmaps/AddChapter";
import { AddNode } from "./page/roadmaps/AddNode";
import { RecommendedProject } from "./page/roadmaps/Recommendation/Project";
import { RecommendedCareer } from "./page/roadmaps/Recommendation/Career";
import { AddCareer } from "./page/career/AddCareer.tsx";
import CareerDetailsModal from "@/page/career/CareerInfoSub";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Overview /> },
      { path: "login", element: <Login_Pg /> },
      {
        path: "roadmap",
        children: [
          { index: true, element: <Roadmap /> },
          { path: "add-roadmap", element: <AddRoadmap /> },
          { path: ":roadmapID/:roadmapSlug", element: <RoadmapDetails /> },
          { path: ":roadmapID/:roadmapSlug/edit", element: <EditRoadmap /> },
          {
            path: ":roadmapID/:roadmapSlug/add-chapter",
            element: <AddChapter />,
          },
          {
            path: ":roadmapID/:roadmapSlug/:chapterID/:chapterSlug",
            children: [
              { index: true, element: <ChapterDetails /> },
              { path: "edit", element: <EditChapter /> },
              { path: "add-node", element: <AddNode /> },
              { path: ":nodeID/edit", element: <EditNode /> },
              { path: "recommend-project", element: <RecommendedProject /> },
              { path: "recommend-career", element: <RecommendedCareer /> },
            ],
          },
        ],
      },
      {
        path: "project",
        children: [
          { index: true, element: <Project /> },
          { path: ":projectId", element: <ProjectDetails /> },
          { path: "myProjects", element: <MyProjects /> },
          { path: "submission/:submissionId", element: <SubmissionDetails /> },
        ],
      },
      { path: "career",
        children: [
          { index: true, element: <Career /> },
          { path: "addCareer", element: <AddCareer />},
          { path: ":id/:slug", element: <CareerDetailsModal />},
          
        ],
      },
      { path: "profile", element: <All /> },
      { path: "signup", element: <Signup_Pg /> },
      { path: "forgot-password", element: <ForgotPassword_Pg /> },
      { path: "reset-password", element: <ResetPassword_Pg /> },
      // fallback route still optional; errorElement will catch unknown paths
      { path: "*", element: <ErrorBoundary /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

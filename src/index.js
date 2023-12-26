import React from "react";
import { RecoilRoot } from "recoil";
import "./index.css";
import StartPage from "./components/StartPage/StartPage";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import UrlResultPage from "./components/UrlResultPage/UrlResultPage";
import MyScore from "./components/MyScore/MyScore";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";

import SolvePage from "./components/SolveQuestionPage/SolveQuestionPage";
import GetInfo from "./components/GetInfo/GetInfo";
import SolveGetInfo from "./components/SolveGetInfo/SolveGetInfo";
import StartPageUser from "./components/StartPageUser/StartPageUser";
const router = createBrowserRouter([
  //시작페이지
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/start",
    element: <StartPageUser />,
  },
  //질문페이지
  {
    path: "/question",
    element: <QuestionPage />,
  },
  //url결과페이지
  {
    path: "/urlresult",
    element: <UrlResultPage />,
  },
  {
    path: "/solve/:uri",
    element: <SolvePage />,
  },
  {
    path: "/solveGetInfo/:uri",
    element: <SolveGetInfo />,
  },
  {
    path: "/getinfo",
    element: <GetInfo />
  },
  {
    path: "/score",
    element: <MyScore />
  },

]);
createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
